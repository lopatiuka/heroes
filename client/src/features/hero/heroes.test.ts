import { heroesSlice } from './heroesSlice';
import reducer, { IHero, IImage } from './heroesSlice';
import { HeroService } from './services';

let service = new HeroService();

test('heroes should be fetched', () => {
    
    const previousState = { 
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
    }

    const heroes = [
        { 
            nickname: "Test",
            real_name: "Test",
            origin_description: "Test",
            catch_phrase: "Test",
            superpowers: "Test",
        }, 
        { 
            nickname: "Test2",
            real_name: "Test2",
            origin_description: "Test2",
            catch_phrase: "Test2",
            superpowers: "Test2",
        }, 
        { 
            nickname: "Test3",
            real_name: "Test3",
            origin_description: "Test3",
            catch_phrase: "Test3",
            superpowers: "Test3",
        }, 
    ];

    let newState = reducer(previousState, heroesSlice.actions.getHeroes(heroes));
    expect(newState.heroes.length).toEqual(heroes.length);
})

test('heroes should be incremented', () => {
    const previousState = { 
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
    }

    const newState = reducer(previousState,heroesSlice.actions.createHero({nickname: "Test",
    real_name: "Test",
    origin_description: "Test",
    catch_phrase: "Test",
    superpowers: "Test" }))
    expect(newState.heroes.length).toBe(previousState.heroes.length + 1);
})

test('heroes should be decremented', () => {
    const previousState = { 
        displayHeroes: [] as IHero[],
        heroes: [
            { 
                id: 1,
                nickname: "Test",
                real_name: "Test",
                origin_description: "Test",
                catch_phrase: "Test",
                superpowers: "Test",
            }, 
            { 
                id: 2,
                nickname: "Test2",
                real_name: "Test2",
                origin_description: "Test2",
                catch_phrase: "Test2",
                superpowers: "Test2",
            }, 
            { 
                id: 3,
                nickname: "Test3",
                real_name: "Test3",
                origin_description: "Test3",
                catch_phrase: "Test3",
                superpowers: "Test3",
            }, 
        ],
        hero: [] as IHero[],
        editHeroForm: false,
        createHeroForm: false,
        editImages: false,
        heroImages: [] as [],
        fail: false,
        failMessage: "",
        success: false, 
    }

    const newState = reducer(previousState,heroesSlice.actions.deleteHero({nickname: "Test",
    real_name: "Test",
    origin_description: "Test",
    catch_phrase: "Test",
    superpowers: "Test" }))
    expect(newState.heroes.length).toBe(previousState.heroes.length - 1);
})


test('hero should be updated', () => {
    const previousState = { 
        displayHeroes: [] as IHero[],
        heroes: [
            { 
                id: 1,
                nickname: "Test",
                real_name: "Test",
                origin_description: "Test",
                catch_phrase: "Test",
                superpowers: "Test",
            }, 
            { 
                id: 2,
                nickname: "Test2",
                real_name: "Test2",
                origin_description: "Test2",
                catch_phrase: "Test2",
                superpowers: "Test2",
            }, 
            { 
                id: 3,
                nickname: "Test3",
                real_name: "Test3",
                origin_description: "Test3",
                catch_phrase: "Test3",
                superpowers: "Test3",
            }, 
        ],
        hero: [] as IHero[],
        editHeroForm: false,
        createHeroForm: false,
        editImages: false,
        heroImages: [] as [],
        fail: false,
        failMessage: "",
        success: false, 
    }

    const newState = reducer(previousState,heroesSlice.actions.editHero({nickname: "Test",
    real_name: "Test",
    origin_description: "Test",
    catch_phrase: "Test",
    superpowers: "Test" }))
    expect(newState.heroes.length).toBe(previousState.heroes.length + 1);
})