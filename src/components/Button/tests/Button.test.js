import "@babel/polyfill"
import {delay} from "@redux-saga/core/effects";

it("async test", done => {
    setTimeout(done, 100)
});

it("async test 2", () => {
    return new Promise(
        resolve => setTimeout(resolve, 100)
    )
})

it("async test 3",
    async () => await delay(100))