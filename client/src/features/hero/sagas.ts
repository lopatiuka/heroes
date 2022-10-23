import { heroesSlice } from './heroesSlice';
import { call, put, all, takeEvery } from 'redux-saga/effects'
import { HeroService } from './services';
import { sagaActions } from './sagaActions';
import FormData from 'form-data';

let service = new HeroService();

const validation = (hero: Object) => {
    let arr = Object.values(hero);
    for ( let i in arr )
    {
        let item = arr[i];

        if(typeof item === "string") {
            debugger;
            item = arr[i].trim();
        }
        debugger;
        if(item.length === 0) {
            alert("All fields are required");
            return false;
        }
    }
    return true;
}

export function* getHeroes(): any {
    try {
        const heroes = yield call(service.getHeroes);
        yield put(heroesSlice.actions.getHeroes(heroes));
    } catch (e: any) {
        yield put(heroesSlice.actions.failed(e.message));
    }
}

export function* getHeroById(action: any): any {
    try {
        const heroes = yield call(service.getHeroById, action.payload.id);
        yield put(heroesSlice.actions.getHeroById(heroes));
    } catch (e: any) {
        yield put(heroesSlice.actions.failed(e.message));
    }
}

export function* createHero(action: any): any {
    let val = validation(action.payload.hero);
    if(val) {
        const body = new FormData();
        body.append("nickname", action.payload.hero.nickname);
        body.append("realName", action.payload.hero.realName);
        body.append("originDescription", action.payload.hero.originDescription);
        body.append("catchPhrase", action.payload.hero.catchPhrase);
        body.append("superpowers", action.payload.hero.superpowers);

        if(action.payload.newImages && action.payload.newImages.length > 0){
            for(let i = 0; i < action.payload.newImages.length; i++) {
                body.append("images", action.payload.newImages[i]);
            }
        }
        
        try {   
            const newHero = yield call(service.createHero, body);
            yield put(heroesSlice.actions.createHero(newHero));
        } catch (e: any) {
            yield put(heroesSlice.actions.failed(e.message));
        }
    }
}

export function* editHero(action: any): any {
    let val = validation(action.payload.hero);
    if(val) {
        const body = new FormData();
        body.append("nickname", action.payload.hero.nickname);
        body.append("realName", action.payload.hero.realName);
        body.append("originDescription", action.payload.hero.originDescription);
        body.append("catchPhrase", action.payload.hero.catchPhrase);
        body.append("superpowers", action.payload.hero.superpowers);
        body.append("images", action.payload.images);

        if (action.payload.newImages && action.payload.newImages.length > 0) {
            for(let i = 0; i < action.payload.newImages.length; i++) {
                body.append("images", action.payload.newImages[i]);
            }
        }
        try {   
            const hero = yield call(service.editHero, action.payload.heroId, body);
            yield put(heroesSlice.actions.editHero(hero));
        } catch (e: any) {
            yield put(heroesSlice.actions.failed(e.message));
        }
    }
}

export function* deleteHero(action: any): any {
    try {   
        let deletedId = yield call(service.deleteHero, action.payload.id);
        yield put(heroesSlice.actions.deleteHero({id: deletedId, lastElem: action.payload.lastElem}));
    } catch (e: any) {
        yield put(heroesSlice.actions.failed(e.message));
    }
}

function* watchGetHeroes() {
    yield takeEvery(sagaActions.GET_HEROES, getHeroes);
}

function* watchGetHeroById() {
    yield takeEvery(sagaActions.GET_HERO_BY_ID, getHeroById);
}

function* watchCreateHero() {
    yield takeEvery(sagaActions.CREATE_HERO, createHero);
}

function* watchEditHero() {
    yield takeEvery(sagaActions.EDIT_HERO, editHero);
}

function* watchDeleteHero() {
    yield takeEvery(sagaActions.DELETE_HERO, deleteHero);
}

export default function* rootSaga() {
    yield all([
        watchGetHeroes(),
        watchCreateHero(),
        watchGetHeroById(),
        watchEditHero(),
        watchDeleteHero()
    ])
}