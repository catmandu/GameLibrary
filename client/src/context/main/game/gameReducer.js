import 
{ 
    GAME_ERROR,
    GET_GAMES,
    ADD_GAME,
    UPDATE_GAME,
    REMOVE_GAME,
    FILTER_GAMES,
    CLEAR_GAMES,
    SET_LOADING,
    SET_CURRENT_GAME,
    SET_CURRENT_PAGE
} from '../../types';

const GameReducer = (state, action) =>
{
    switch(action.type)
    {
        case GET_GAMES:
        {
            return {
                ...state,
                games: action.payload,
                totalPages: Math.ceil(action.payload.length / state.pageSize),
                loading: false
            };
        }
        case ADD_GAME:
        {
            return {
                ...state,
                games: [],
                loading: true
            };
        }
        case UPDATE_GAME:
        {
            return {
                ...state,
                games: state.games.map(game => game._id === action.payload._id ? action.payload : game),
                currentPage: state.currentPage.map(game => game._id === action.payload._id ? action.payload : game)
            };
        }
        case REMOVE_GAME:
        {
            return {
                ...state,
                games: state.games.filter(game => game._id !== action.payload),
                currentPage: state.currentPage.filter(game => game._id !== action.payload)
            };
        }
        case CLEAR_GAMES:
        {
            return {
                ...state,
                games: [],
                loading: false
            };
        }
        case SET_CURRENT_PAGE:
        {
            return {
                ...state,
                pageNumber: action.payload,
                currentPage: state.games.slice((action.payload - 1) * state.pageSize, state.pageSize * action.payload)
            };
        }
        case FILTER_GAMES:
        {
            return {
                ...state,                
                filtered: action.payload === '' ? null : state.currentPage.filter(game =>
                {
                    const regex = new RegExp(action.payload, 'gi');
                    
                    return game.name.match(regex) ||
                            game.developer.match(regex) ||
                            game.publisher.match(regex) ||
                            game.platforms.find(platform => platform.match(regex)) ||
                            game.genres.find(genre => genre.match(regex)) ||
                            game.release.match(regex);
                }),
                loading: false
            };
        }
        case SET_CURRENT_GAME:
        {
            return {
                ...state,
                current: action.payload,
                loading:false
            };
        }
        case SET_LOADING:
        {
            return {
                ...state,
                loading: true
            };
        }
        case GAME_ERROR:
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

export default GameReducer;
