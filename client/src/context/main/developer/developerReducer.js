import 
{
    SET_LOADING,
    SET_CURRENT_PAGE,
    GET_DEVELOPERS,
    ADD_DEVELOPER,
    DEVELOPER_ERROR,
    SET_CURRENT_DEVELOPER,
    FILTER_DEVELOPERS,
    UPDATE_DEVELOPER,
    REMOVE_DEVELOPER
} from '../../types';

const DeveloperReducer = (state, action) =>
{
    switch(action.type)
    {
        case GET_DEVELOPERS:
        {
            return {
                ...state,
                developers: action.payload,
                totalPages: Math.ceil(action.payload.length / state.pageSize),
                loading: false
            };
        }
        case ADD_DEVELOPER:
        {
            return {
                ...state,
                developers: []
            };
        }
        case UPDATE_DEVELOPER:
        {
            return {
                ...state, 
                developers: state.developers.map(dev => dev._id === action.payload._id ? action.payload : dev),
                currentPage: state.currentPage.map(dev => dev._id === action.payload._id ? action.payload : dev)
            };   
        }
        case REMOVE_DEVELOPER:
        {
            return {
                ...state, 
                developers: state.developers.filter(dev => dev._id !== action.payload),
                currentPage: state.currentPage.filter(dev => dev._id !== action.payload)
            };
        }
        case SET_CURRENT_DEVELOPER:
        {
            return {
                ...state,
                current: action.payload
            };
        }
        case SET_CURRENT_PAGE:
        {
            return {
                ...state,
                pageNumber: action.payload,
                currentPage: state.developers.slice((action.payload - 1) * state.pageSize, state.pageSize * action.payload)
            };   
        }
        case FILTER_DEVELOPERS:
        {
            return {
                ...state,
                filtered: action.payload === '' ? null : state.currentPage.filter(dev => 
                {
                    const regex = new RegExp(action.payload, 'gi');
                    return dev.name.match(regex);   
                }),
                loading: false
            };
        }
        case SET_LOADING:
        {
            return {
                ...state,
                loading: true
            };
        }
        case DEVELOPER_ERROR:
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

export default DeveloperReducer;
