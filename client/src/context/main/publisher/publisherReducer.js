import 
{
    GET_PUBLISHERS,
    ADD_PUBLISHER,
    UPDATE_PUBLISHER,
    REMOVE_PUBLISHER,
    FILTER_PUBLISHERS,
    SET_CURRENT_PUBLISHER,
    PUBLISHER_ERROR,
    SET_LOADING,
    SET_CURRENT_PAGE
} from '../../types';

const PublisherReducer = (state, action) =>
{
    switch(action.type)
    {
        case GET_PUBLISHERS:
        {
            return {
                ...state,
                publishers: action.payload,
                totalPages: Math.ceil(action.payload.length / state.pageSize),
                loading: false
            };
        }
        case ADD_PUBLISHER:
        {
            return {
                ...state,
                publishers: []
            };
        }
        case UPDATE_PUBLISHER:
        {
            return {
                ...state,
                publishers: state.publishers.map(pub => pub._id === action.payload._id ? action.payload : pub),
                currentPage: state.currentPage.map(pub => pub._id === action.payload._id ? action.payload : pub)
            };
        }
        case REMOVE_PUBLISHER:
        {
            return {
                ...state,
                publishers: state.publishers.filter(pub => pub._id !== action.payload),
                currentPage: state.currentPage.filter(pub => pub._id !== action.payload)
            };
        }
        case SET_CURRENT_PAGE:
        {
            return {
                ...state,
                pageNumber: action.payload,
                currentPage: state.publishers.slice((action.payload - 1) * state.pageSize, state.pageSize * action.payload)
            };   
        }
        case FILTER_PUBLISHERS:
        {
            return {
                ...state,
                filtered: action.payload === '' ? null : state.currentPage.filter(pub =>
                {
                    const regx = new RegExp(action.payload, 'gi');
                    return pub.name.match(regx);
                }),
                loading: false
            };
        }
        case SET_CURRENT_PUBLISHER:
        {
            return {
                ...state,
                current: action.payload
            };
        }
        case SET_LOADING:
        {
            return {
                ...state,
                loading: true
            };
        }
        case PUBLISHER_ERROR:
        {
            return {
                ...state,
                error: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default PublisherReducer;
