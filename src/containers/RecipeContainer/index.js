/**
 *
 * RecipeContainer
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import makeSelectRecipeContainer, {
    makeSelectAddCommentError,
    makeSelectAddCommentStatus,
    makeSelectComments,
    makeSelectCommentsNumber,
    makeSelectGetRatingsStatus,
    makeSelectRatingsMean,
    makeSelectRecipe,
    makeSelectRemoveCommentStatus,
    makeSelectStatus,
    makeSelectTags,
    selectSlug,
} from './selectors';
import { makeSelectUser } from '../LoginContainer/selectors';
import {
    addComment,
    editComment,
    getComments,
    getRecipe,
    getRecipeRatings,
    loadTags,
    removeComment,
    sendRating,
} from './actions';
import RecipeWrapper from '../../components/RecipeWrapper';
import fetchStates from '../../utils/fetchStates';
import Spinner from '../../components/Spinner';

export function RecipeContainer({ status, ...props }) {

    useEffect(() => {
        if (props.tags.length === 0) props.loadTags();
    }, []);

    useEffect(() => {
        if (props.recipeId && !props.ratingsMean) props.getRecipeRatings(props.recipeId);
    }, [
        /*props.recipeId*/
    ]);

    useEffect(() => {
        if (props.recipeId) props.getRecipe(props.recipeId);
    }, []);

    useEffect(() => {
        props.getComments(props.recipeId);
    }, [props.addCommentStatus, props.removeCommentStatus]);

    return status === fetchStates.fetching ? <Spinner /> : <RecipeWrapper {...props} />;
}

RecipeContainer.propTypes = {};

const mapStateToProps = createStructuredSelector({
    recipeContainer: makeSelectRecipeContainer(),
    user: makeSelectUser(),
    recipe: makeSelectRecipe(),
    ratingsMean: makeSelectRatingsMean(),
    getRatingsStatus: makeSelectGetRatingsStatus(),
    tags: makeSelectTags(),
    recipeId: selectSlug(),
    comments: makeSelectComments(),
    addCommentStatus: makeSelectAddCommentStatus(),
    addCommentError: makeSelectAddCommentError(),
    commentsNumber: makeSelectCommentsNumber(),
    removeCommentStatus: makeSelectRemoveCommentStatus(),
    status: makeSelectStatus(),
});

function mapDispatchToProps(dispatch) {
    return {
        getRecipe: recipeId => dispatch(getRecipe(recipeId)),
        getRecipeRatings: recipeId => dispatch(getRecipeRatings(recipeId)),
        loadTags: () => dispatch(loadTags()),
        sendRating: (rate, userId, recipeId) => dispatch(sendRating(rate, userId, recipeId)),
        getComments: recipeId => dispatch(getComments(recipeId)),
        addComment: (recipeId, content, email) => dispatch(addComment(recipeId, content, email)),
        editComment: (commentId, userId, content) => dispatch(editComment(commentId, userId, content)),
        removeComment: commentId => dispatch(removeComment(commentId)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(RecipeContainer);