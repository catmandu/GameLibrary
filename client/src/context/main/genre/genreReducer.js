import 
{
    GET_GENRES,
    SET_CURRENT_PAGE,
    ADD_GENRE,
    UPDATE_GENRE,
    REMOVE_GENRE,
    FILTER_GENRES,
    SET_CURRENT_GENRE,
    SET_LOADING,
    GENRE_ERROR
} from '../../types';

const GenreReducer = (state, action) =>
{
    switch(action.type)
    {
        case GET_GENRES:
        {
            return {
                ...state,
                genres: action.payload,
                totalPages: Math.ceil(action.payload.length / state.pageSize),
                loading: false
            };
        }
        case ADD_GENRE:
        {
            return {
                ...state,
                genres: []
            };   
        }
        case UPDATE_GENRE:
        {
            return {
                ...state,
                genres: state.genres.map(gen => gen._id === action.payload._id ? action.payload : gen),
                currentPage: state.currentPage.map(gen => gen._id === action.payload._id ? action.payload : gen)
            };   
        }
        case REMOVE_GENRE:
        {
            return {
                ...state,
                genres: state.genres.filter(gen => gen._id !== action.payload),
                currentPage: state.currentPage.filter(gen => gen._id !== action.payload)
            };
        }
        case SET_CURRENT_PAGE:
        {
            return {
                ...state,
                pageNumber: action.payload,
                currentPage: state.genres.slice((action.payload - 1) * state.pageSize, state.pageSize * action.payload)
            };   
        }
        case FILTER_GENRES:
        {
            return {
                ...state,
                filtered: action.payload === '' ? null : state.currentPage.filter(gen =>
                {
                    const regex = new RegExp(action.payload, 'gi');

                    return gen.name.match(regex);
                }),
                loading: false
            };
        }
        case SET_CURRENT_GENRE:
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
        case GENRE_ERROR:
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

export default GenreReducer;
