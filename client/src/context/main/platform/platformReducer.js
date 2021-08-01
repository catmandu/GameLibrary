import 
{
    GET_PLATFORMS,
    ADD_PLATFORM,
    UPDATE_PLATFORM,
    REMOVE_PLATFORM,
    FILTER_PLATFORMS,
    PLATFORM_ERROR,
    SET_CURRENT_PLATFORM,
    SET_CURRENT_PAGE,
    SET_LOADING
} from '../../types';

const PlatformReducer = (state, action) =>
{
    switch(action.type)
    {
        case GET_PLATFORMS:
        {
            return {
                ...state,
                platforms: action.payload,
                totalPages: Math.ceil(action.payload.length / state.pageSize),
                loading: false
            };
        }
        case ADD_PLATFORM:
        {
            return {
                ...state,
                platforms: []
            };
        }
        case UPDATE_PLATFORM:
        {
            return {
                ...state,
                platforms: state.platforms.map(plat => plat._id === action.payload._id ? action.payload : plat),
                currentPage: state.currentPage.map(plat => plat._id === action.payload._id ? action.payload : plat)
            };
        }
        case REMOVE_PLATFORM:
        {
            return {
                ...state,
                platforms: state.platforms.filter(plat => plat._id !== action.payload),
                currentPage: state.currentPage.filter(plat => plat._id !== action.payload)
            };
        }
        case SET_CURRENT_PAGE:
        {
            return {
                ...state,
                currentPage: state.platforms.slice((state.pageNumber - 1) * state.pageSize, state.pageSize * state.pageNumber)
            };
        }
        case FILTER_PLATFORMS:
        {
            return {
                ...state,
                filtered: action.payload === '' ? null : state.currentPage.filter(platform =>
                {
                    const regex = new RegExp(action.payload, 'gi');

                    return platform.name.match(regex);
                }),
                loading: false
            };
        }
        case SET_CURRENT_PLATFORM:
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
        case PLATFORM_ERROR:
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

export default PlatformReducer;
