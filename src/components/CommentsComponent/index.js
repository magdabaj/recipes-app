import React from 'react';
import '../../containers/RecipeContainer/index.css';
import CommentForm from '../CommentForm';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

const CommentsComponent = ({
                               comments,
                               addComment,
                               recipeId,
                               user,
                               getComments,
                               // editComment,
                               removeComment,
                               ...props
                           }) =>
    <section className={'comments-container'}>
        {user.loggedIn ? (
            <CommentForm
               addComment={addComment}
               recipeId={recipeId}
               user={user}
               getComments={getComments}
               {...props}
            />) : (
                <h3>
                    <Link to={'/login'} >Musisz sie zalogowac zeby dodac komentarz</Link>
                </h3>
            )}
            <div>
                {comments.map(comment => (
                    <ol key={comment.id} className={'comments-list'}>
                        <li className={'comment-body'}>
                            <article className={'comment-article'}>
                                <footer className={'comment-title'}>
                                    <div className={'comment-author'}>{comment.email}</div>
                                    <div className={'comment-data'}>
                                        {comment.addedDate.replace(/T/, ' o ').replace(/.Z/g, '')}
                                    </div>
                                </footer>
                                <div className={'comment-content'}>
                                    <p>{comment.content}</p>
                                </div>
                                {comment.email.trim() === user.email ? (
                                    <div className={'comment-edit'}>
                                        <div className={'comment-edit--button'}>Edytuj</div>
                                        <div
                                            role={'remove-comment-button'}
                                            className={'comment-edit--button'}
                                            onClick={() => removeComment(comment.id)}
                                        >
                                            Usuń
                                        </div>
                                    </div>
                                ) : null}
                            </article>
                        </li>
                    </ol>
                ))}
            </div>
    </section>

CommentsComponent.propTypes = {
    comments: PropTypes.array.isRequired,
    addComment: PropTypes.func.isRequired,
    recipeId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    getComments: PropTypes.func.isRequired,
    // editComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
};

export default CommentsComponent;
