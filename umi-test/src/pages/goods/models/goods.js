import axios from 'axios';

// api
function getGoods(){
  return axios.get('/api/goods').then(({data}) => {
    return {
      courses: data.data.data,
      tags: data.data.tags,
    }
  })
}

export default {
  namespace: "goods",
  state: {
    courses: {},
    tags: []
  },
  effects: {
    *getList(action, {call, put}){
      const payload = yield call(getGoods)
      
      yield put({ type: 'initGoods', payload })
    }
  },
  reducers: {
    initGoods(state,{payload}){
      console.log(payload);

      return payload
    },
    addGood(state, action) {
      console.log(action);
      return [...state, { title: action.payload.title }];
    }
  }
};
