import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {compose} from "redux";
import { createStructuredSelector } from 'reselect';
import makeSelectRecipesHomePage, {
    makeSelectNextPage,
    makeSelectPreviousPage,
    makeSelectRecipes,
    makeSelectStatus,
    makeSelectTotalPages,
    selectPage,
    selectTagId,
} from './selectors';
import { makeSelectTags } from "../App/selectors";
import { loadRecipes, loadRecipesByTag } from './actions';
import { loadTags } from "../App/actions";
import AllRecipesComponent from '../../components/RecipesComponent';
import fetchStates from '../../utils/fetchStates';
import Spinner from '../../components/Spinner';

export function RecipesHomePage({ status, ...props }) {

    useEffect(() => {
        if (props.tags.length === 0) props.loadTags();
        if (props.tagId) props.loadRecipesByTag(props.tagId, props.page);
        else props.loadRecipes(props.page);
    }, [props.tagId, props.page]);

    // todo add list of rated recipes
    // todo add recipes to favourites

    const route = props.match.path;
    return status === fetchStates.fetching /*|| status === fetchStates.error*/ ? (
        <Spinner />
    ) : (
        <AllRecipesComponent route={route} {...props} />
    );
}

RecipesHomePage.propTypes = {
    status: PropTypes.string,
    tags: PropTypes.array,
    loadTags: PropTypes.func,
    tagId: PropTypes.string,
    page: PropTypes.number,
    loadRecipes: PropTypes.func,
    loadRecipesByTag: PropTypes.func,
    match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    recipesHomePage: makeSelectRecipesHomePage(),
    tags: makeSelectTags(),
    recipes: makeSelectRecipes(),
    tagId: selectTagId(),
    page: selectPage(),
    totalPages: makeSelectTotalPages(),
    nextPage: makeSelectNextPage(),
    previousPage: makeSelectPreviousPage(),
    status: makeSelectStatus(),
});

function mapDispatchToProps(dispatch) {
    return {
        loadRecipes: page => dispatch(loadRecipes(page)),
        loadRecipesByTag: (tagId, page) => dispatch(loadRecipesByTag(tagId, page)),
        loadTags: () => dispatch(loadTags()),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(RecipesHomePage);