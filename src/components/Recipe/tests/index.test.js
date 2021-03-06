import Recipes from "../index";
import {loggedOutUser} from "../../../utils/testHelpers/fixtures/user";
import {fakeRecipes} from "../../../utils/testHelpers/fixtures/recipes";
import commonTests from "../../../utils/testHelpers/commonTests";
import React from "react";
import {render, screen} from "@testing-library/react";
import { Redirect as MockRedirect } from "react-router";
import userEvent from "@testing-library/user-event";

jest.mock('react-router', () => {
    return {
        Redirect: jest.fn(() => null)
    }
})

const sendRatingMocked = jest.fn()

const fakeUser = {
    userId: 1,
    email: 'test',
    loggedIn: true,
    error: null,
    status: null,
    logoutStatus: null
}
const renderRecipe = (user = fakeUser) =>
    render(<Recipes user={user} commentsNumber={5} sendRating={sendRatingMocked} recipes={fakeRecipes} recipeId={1}/>)

commonTests(renderRecipe)

test('redirects if user is not logged in', () => {
    renderRecipe(loggedOutUser)
    const heart1 = screen.getAllByTestId('heart-1')
    userEvent.click(heart1[0])
    expect(MockRedirect).toHaveBeenCalledWith({to: '/login'}, {})
})

test('fires sensRating action when user is logged in', () => {
    renderRecipe()
    const heart1 = screen.getAllByTestId('heart-1')
    userEvent.click(heart1[0])
    expect(sendRatingMocked).toHaveBeenCalledWith(1,1,1)
    expect(sendRatingMocked).toHaveBeenCalledTimes(1)
})

