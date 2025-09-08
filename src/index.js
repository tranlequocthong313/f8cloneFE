import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import NavContextProvider from './context/NavContext';
import { Provider } from 'react-redux';
import store from './reducers/index';
import LearningContextProvider from './context/LearningContext';
import BlogContextProvider from './context/BlogContext';
import './sass/_tour.scss';
import TutorialProvider from './context/TutorialContext';

if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <TutorialProvider>
                <NavContextProvider>
                    <LearningContextProvider>
                        <BlogContextProvider>
                            <App />
                        </BlogContextProvider>
                    </LearningContextProvider>
                </NavContextProvider>
            </TutorialProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
