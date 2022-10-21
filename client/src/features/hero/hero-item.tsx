import { useEffect } from "react";
import { Container, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { editHeroForm, editImages, heroesSlice, IImage, selectHero, selectHeroes, selectImages } from "./heroesSlice";
import { HeroFormComponent } from "./heroForm";
import { sagaActions } from "./sagaActions";
import Checkbox from '@mui/material/Checkbox';

export function HeroItem() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const heroId: any = params.id;
    const heroes = useSelector(selectHeroes);
    const imagesState = useSelector(selectImages);
    const hero = useSelector(selectHero);
    let isHeroFormVisible = useSelector(editHeroForm);
    let isEditImages = useSelector(editImages);
    let imagesToDelete: string[] = [...imagesState];

    useEffect (() => {
        if(heroes.length > 0) {
            let currentHero = heroes.find((item: any) => Number.parseInt(item.id) === Number.parseInt(heroId));
            dispatch(heroesSlice.actions.getHeroById(currentHero));
        }
        else {
            navigate("/");
        }
    }, [])

    return( 
        <Container className="hero-item">
            <NavLink to="/">Back</NavLink>
            <Grid container direction="column" alignItems="center" spacing={3}>
            <Button variant="contained" onClick = {e => dispatch(heroesSlice.actions.showEditHeroForm())}>Edit Hero</Button>
            <div className="hero-info">
                <h2>{hero.nickname}</h2>
                <h4><span>Real name</span>: {hero.realName}</h4>
                <h4><span>Description</span>: {hero.originDescription}</h4>
                <h4><span>Catch phrase</span>: {hero.catchPhrase}</h4>
                <h4><span>Superpowers</span>: {hero.superpowers}</h4>
            </div>
                <Grid container direction="column" spacing={2} justifyContent="center" alignItems="center">
                {imagesState ?<Button onClick = {e => dispatch(heroesSlice.actions.showEditImages())}>Edit Images</Button> : null}
                <Grid container justifyContent="center" spacing={2} direction="row">
                {imagesState ?
                imagesState.map((item: string) => {
                    if( item ) {
                    return <Grid item className="hero-image d-flex flex-column"> 
                            <img key={item} style={{maxWidth: 100}} src={`http://localhost:5000/${item}`} alt="" />
                            {isEditImages ? <div>
                                <Checkbox color="error" onClick={e => {
                                imagesToDelete.find(elem => elem === item) ? imagesToDelete.splice(imagesToDelete.findIndex(elem => elem === item), 1) :
                                imagesToDelete.push(item);
                            }}/>
                            </div> : null}
                    </Grid>
                    } else return null
                }) : null}
                </Grid>
                    {isEditImages ?  <Grid item>
                        <Button variant="contained" color="success" 
                            onClick={ e =>
                            dispatch({type: sagaActions.EDIT_HERO,
                                payload: {heroId, hero, images: imagesToDelete}})
                            }>Submit</Button>

                        <Button variant="contained" onClick={e => dispatch(heroesSlice.actions.hideEditImages())}>Cancel</Button>
                        </Grid>: null 
                    } 
                </Grid>
            </Grid>

            {isHeroFormVisible ? <HeroFormComponent 
            nickname = {hero.nickname} 
            realName = {hero.realName}
            originDescription = {hero.originDescription}
            catchPhrase = {hero.catchPhrase} 
            superpowers = {hero.superpowers}
            images = {imagesToDelete}
            actionType = {sagaActions.EDIT_HERO}
            class="hero-form hero-form--edit"/> : null } 
    </Container>)
}