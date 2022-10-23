import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Grid, Button } from "@mui/material";
import { selectHero, heroesSlice } from "./heroesSlice";
import Close from "@mui/icons-material/Close";

export function HeroFormComponent(props: any) {
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState(props.nickname || "Test");
    const [realName, setRealName] = useState(props.realName || "Test");
    const [originDescription, setOriginDescription] = useState(props.originDescription || "test");
    const [catchPhrase, setCatchPhrase] = useState(props.catchPhrase || "test");
    const [superpowers, setSuperpowers] = useState(props.superpowers || "test");
    const [newImages, setNewImages] = useState([]);
    const images = props.images;
    const hero = useSelector(selectHero);
    let heroId = hero.id;
    
    function handleImages(e: any): any {
        setNewImages(e.target.files);
    }

    return (<Grid container direction="column" alignItems="center" className={props.class}>
        <Grid container direction="column" alignItems="center" rowSpacing={1}>
            <Grid item>
                <TextField  id="nickname" label="Nickname" variant="standard" onChange = {e => {setNickname(e.target.value)}} value = {nickname}/>
            </Grid>
            <Grid item>
                <TextField id="real-name" label="Real Name" variant="standard" onChange = {e => {setRealName(e.target.value)}} value = {realName}/>
            </Grid>            
            <Grid item>
                <TextField id="origin-decription" label="Origin description" variant="standard" onChange = {e => {setOriginDescription(e.target.value)}} value = {originDescription}/>
            </Grid>
            <Grid item>
                <TextField id="catch-phrase" label="Catch phrase" variant="standard" onChange = {e => {setCatchPhrase(e.target.value)}} value = {catchPhrase}/>
            </Grid>
            <Grid item>
                <TextField id="superpower" label="Superpower" variant="standard" onChange = {e => {setSuperpowers(e.target.value)}} value = {superpowers}/>
            </Grid>
            <Grid item>
                {Array.from(newImages).map((item: any) => {
                    return <p>{item.name} <Close onClick={e => {
                        let imagesArray = Array.from(newImages);
                        imagesArray.splice(imagesArray.findIndex(elem => elem === item), 1);
                        setNewImages(imagesArray);
                    }}/></p>
                })}
            </Grid>
            <Grid item>
            <Button variant="contained" component="label">
                Upload
            <input hidden accept="image/*" multiple type="file" name="images" id="images"  onChange={ e => handleImages(e)}/>
            </Button>
            </Grid>
            <Grid item>
                <Button variant="contained" color="success" 
                    onClick={ e =>
                     dispatch({type: props.actionType, 
                        payload: {heroId, hero: { nickname, realName, originDescription, catchPhrase, superpowers }, images, newImages}})
                }>Submit</Button>

                <Button variant="contained" onClick={e => dispatch(heroesSlice.actions.hideEditHeroForm())}>Cancel</Button>
            </Grid>
        </Grid>
    </Grid>)
}