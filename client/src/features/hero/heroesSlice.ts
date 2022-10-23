import { createSlice } from '@reduxjs/toolkit'

export interface IHero {
  id: number,
  nickname: string,
  real_name: string,
  origin_description: string,
  catch_phrase: string,
  superpowers: string,
  images: string[],
}

export const heroesSlice = createSlice({
  name: 'heroes',
  initialState: {
    displayHeroes: [] as IHero[],
    heroes: [] as IHero[],
    hero: [] as IHero[],
    editHeroForm: false,
    createHeroForm: false,
    editImages: false,
    heroImages: [] as [],
    fail: false,
    failMessage: "",
    success: false,
    activePage: 1
  },
  reducers: {

    getHeroes: (state, action) => {
      state.heroes = action.payload;
      state.displayHeroes = state.heroes.filter((el, index) => index < 5);
    },

    getHeroById: (state, action) => {
      state.hero = action.payload;
      state.heroImages = action.payload.images;
    },

    createHero: (state, action) => {
      const hero = {
        ...action.payload
      }

      state.heroes.push(hero);
      if(state.displayHeroes.length < 5)
      state.displayHeroes.push(hero);
      state.createHeroForm = false;
    },

    deleteImage(state, action) {
      let index = state.heroImages.findIndex(item => item === action.payload);
      state.heroImages.splice(index, 1);
    },

    editHero: (state, action) => {
      const hero = {
        ...action.payload
      }

      let index = state.heroes.findIndex(item => item.id == Number.parseInt(hero.id));
      state.heroes.splice(index, 1, hero);
      state.hero = hero;
      state.heroImages = hero.images;
      state.editHeroForm = false;
      state.editImages = false;
      state.success = true;
    },

    deleteHero: (state, action) => {
      let index = state.heroes.findIndex(item => item.id == Number.parseInt(action.payload.id));
      state.heroes.splice(index, 1);
      state.displayHeroes.splice(state.displayHeroes.findIndex(item => item.id == Number.parseInt(action.payload.id)), 1);
      if(state.heroes[action.payload.lastElem - 1])
      state.displayHeroes.push(state.heroes[action.payload.lastElem - 1]);
    },

    getDetails: (state, action) => {
      state.hero = {
        ...action.payload
      }
    },

    setDisplayHeroes: (state, action) => {
      state.displayHeroes = state.heroes.filter((el, index) => index >= action.payload.firstElem && index < action.payload.lastElem);
      state.activePage = action.payload.number;
    },

    showCreateHeroForm: (state) => {
      state.createHeroForm = true;
    },

    hideCreateHeroForm: (state) => {
      state.createHeroForm = false;
    },

    showEditHeroForm: (state) => {
      state.editHeroForm = true;
    },

    hideEditHeroForm: (state) => {
      state.editHeroForm = false;
      state.createHeroForm = false;
    },

    showEditImages: (state) => {
      state.editImages = true;
    },

    hideEditImages: (state) => {
      state.editImages = false;
    },

    failed: (state, action) => {
      state.fail = true;
      state.failMessage = action.payload;
    },

    closeFailedTab: (state) => {
      state.fail = false;
    },
  }
})
export const initialState = (state: any) => state;
export const selectActivePage = (state: any) => state.heroes.activePage;
export const selectHeroes = (state: any) => state.heroes.heroes;
export const selectDisplayHeroes = (state: any) => state.heroes.displayHeroes;
export const selectHero = (state: any) => state.heroes.hero;
export const selectImages = (state: any) => state.heroes.heroImages;
export const editImages = (state: any) => state.heroes.editImages;
export let editHeroForm = (state: any) => state.heroes.editHeroForm;
export let createHeroForm = (state: any) => state.heroes.createHeroForm;
export const fetchFailed = (state: any) => state.heroes.fail;
export const fetchSuccess = (state: any) => state.heroes.success;
export const failMessage = (state: any) => state.heroes.failMessage;
export default heroesSlice.reducer;