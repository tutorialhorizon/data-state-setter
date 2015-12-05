data-state-setter
---

Encapsulate the state of your data like init, loading, success and failure with the data itself.

---

In every form of human-computer-interaction, events occur that trigger a change in the state of data. In order to visually indicate that change to the user, its its only fair to associate the state of the data with the data itself.

This is particularly useful when using framworks like React and Redux that encapsulate the state of a system in terms of pure data.

This library provides four methods - init, success, failure and loading that let you make this association between the data and its state which can be easily translated to a UI state by simply following a convention.

---

#### Example
The following example demonstrates how you could use the methods of this library when using redux redux reducers and React, but you can also use this library all by itself.

// Using the setter methods, you'd be able to do the following in your React component
```js
import { connect } from 'react-redux';
import React, { Component } from 'react';

class App extends Component {
    render() {
        const {props} = this;

        if (props.posts.isSuccess) {
            return this.renderData();
        }
        
        // Handle the other data states
        if (props.posts.isLoading) {
            return this.renderSpinner();
        }

        if (props.posts.isError) {
            return this.renderError();
        }

        if (props.posts.isInit) {
            return this.renderInit();
        }
    },

    renderData() {
        // Notice how we are accessing posts as - posts.value
        let posts = this.props.posts.value;

        return (
            <ul>
                {posts.forEach(post => <li>{post.title}</li>)}
            </ul>
        );
    }
    ... other render methods...
}

// Expose a posts props using react-redux connect
export default connect(state => {
        return {posts: state.posts};
    }
)(App)
```

Notice how this improved the predictability of what the component does as well as how the component itself can predict the format of the prop that it receives and render accordingly.

Here's the rest of the example using redux. *Assumes you are using the redux-thunk middleware to enable this kind of dispatch.*

```js
// Following the FSA(Flux Standard Action) convention
// https://github.com/acdlite/flux-standard-action
import { createAction } from 'redux-actions';

let LOADING_POST = 'LOADING_POST';
let FETCH_POST = 'FETCH_POST';

let loadingAction = createAction(LOADING_POST);
let dataAction = createAction(FETCH_POST)

// Action
export default function fetchPosts(payload, params) {
    return (dispatch, getState) => {
        dispatch(loadingAction());

        return fetch('/posts', payload)
            .then(posts => {
                dispatch(dataAction({posts}));
            })
            .catch(err => {
                dispatch(dataAction(err));
            });
    };
}

// Reducer
import {init, loading, success, failure} from 'data-state-setter';

let initialState = init([]); // Setup an initial state.
export function posts(state = inititialState, action) {
    switch (action.type) {
        case FETCH_POSTS:
            let { payload } = action.payload;
            
            if (action.error) {
                // Add any custom logic if you need to before setting.
                return failure(payload);
            } else {
                // Add any custom logic if you need to before setting.
                return success(payload.posts);
            }
        case LOADING_POSTS:
            // Add any custom logic if you need to before setting.
            return loading(state.value);
    }

    return state;
}
```

Check out the source code! Its just a bunch of four one liner functions.

---
