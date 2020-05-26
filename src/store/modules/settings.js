import defaultSettings from "@/settings";
import { objectEvaluate } from "@/utils/common";

const {
  isShowLogo,
  isShowTag,
  isShowFooter,
  isNight,
  isVertical,
  isUniqueOpened,
  layoutSize
} = defaultSettings;

const type = {
  CHANGE_SETTING: "CHANGE_SETTING",
  RESTORE_SETTING: "RESTORE_SETTING"
};

const state = {
  isShowLogo: isShowLogo,
  isShowTag: isShowTag,
  isShowFooter: isShowFooter,
  isNight: isNight,
  isVertical: isVertical,
  isUniqueOpened: isUniqueOpened,
  layoutSize: layoutSize
};

const getters = {
  setting: state => state
};

const mutations = {
  [type.CHANGE_SETTING](state, { key, value }) {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
  [type.RESTORE_SETTING](state) {
    objectEvaluate(state, defaultSettings);
  }
};

const actions = {
  changeSetting: ({ commit }, setting) => {
    commit(type.CHANGE_SETTING, setting);
  },
  restoreSetting: ({ commit }) => {
    commit(type.RESTORE_SETTING);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
