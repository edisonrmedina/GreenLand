import { authData } from "./action"
import {
  PREV,
  NEXT,
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  APPLY_FILTERS,
  GET_ID_DETAIL,
  NUM_PAGE,
  GET_ALL_REVIEWS,
  GET_WHISLIST,
  DEL_WHISLIST,
  AUTH,
  LOGOUT,
  GET_ORDERS_PER_USER,
  GET_ALL_ORDERS,
  GET_DETAIL_ORDERS,
  DELETE_REVIEW,
  GET_USERS_ADMIN,  
  UNDO_PURCHASE_FORM,
} from "./actionType"

const initialState = {
  authData: null,
  numPageState: 1,
  allProducts: [],
  allCategories: [],
  allReviews: [],
  filterProducts: [],
  productDetail: [],
  whisListState: [],
  deletingReview: false,
  undoPurchaseForm: {
    name: '',
    email: '',
    orderNumber: '',
    message: '',
    isSubmitting: false,
    submissionMessage: '',
  },
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case PREV:
      return {
        ...state,
        numPageState: state.numPageState - 1,
      }

    case NEXT:
      return {
        ...state,
        numPageState: state.numPageState + 1,
      }
    case NUM_PAGE:
      return {
        ...state,
        numPageState: Number(payload),
      }

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
        filterProducts: payload,
      }

    case GET_ALL_REVIEWS:
      return {
        ...state,
        allReviews: payload,
      }  

    case GET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: payload,
      }

    case APPLY_FILTERS:
      return {
        ...state,
        filterProducts: payload,
        numPageState: 1,
      }

    case GET_ID_DETAIL:
      return {
        ...state,
        productDetail: payload,
      }
    case GET_WHISLIST:
      return {
        ...state,
        whisListState: [...state.whisListState, payload],
      }
    case DEL_WHISLIST: {
      const newWhis = state.whisListState.filter((pro) => pro.id != payload)
      return {
        ...state,
        whisListState: newWhis,
      }
    }
    case AUTH:
      if (!localStorage.getItem("profile"))
        localStorage.setItem("profile", JSON.stringify(payload))
      return {
        ...state,
        authData: payload?.user,
      }
    case LOGOUT:
      localStorage.clear()
      return {
        ...state,
        authData: null,
      }

    case GET_ORDERS_PER_USER:
      return {
        ...state,
        authData: {
          ...state.authData,
          orders: payload,
        },
      }

    case GET_DETAIL_ORDERS:
      return {
        ...state,
        authData: {
          ...state.authData,
          detailOrders: payload,
        },
      }

    case GET_ALL_ORDERS:
      return {
        ...state,
        authData: {
          ...state.authData,
          allOrders: payload,
        },
      }
      
      case DELETE_REVIEW:
        const updatedReviews = state.allReviews.filter(
          (review) => review.id !== action.payload
          );
          return {
            ...state,
          allReviews: updatedReviews,
        };
        
        case GET_USERS_ADMIN:
          return {
            ...state,
            authData: {
              ...state.authData,
              allUsers: payload,
            },
          }
      
          case UNDO_PURCHASE_FORM:
            return {
              ...state,
              undoPurchaseForm: {
                name: '',
                email: '',
                orderNumber: '',
                message: '',
                isSubmitting: false,
                submissionMessage: '',
              },
            };

        default:
          return { ...state }
        }
}
