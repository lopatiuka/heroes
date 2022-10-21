import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { HeroItem } from "./hero-item";
import { HeroesComponent } from "./Heroes";
import { fetchFailed, failMessage, heroesSlice } from "./heroesSlice";
import { sagaActions } from "./sagaActions";
import Close from "@mui/icons-material/Close";

export function MainComponent() {
    const dispatch = useDispatch();
    const failed = useSelector(fetchFailed);
    const message = useSelector(failMessage)

    useEffect(() => {
      dispatch({type: sagaActions.GET_HEROES});
    }, [])

    return (<Router>
        { failed ? <Alert className="alert" key="danger" variant="danger">
            <Close onClick={e => dispatch(heroesSlice.actions.closeFailedTab())}/>
          {message}
        </Alert> : null }
        <Routes>
            <Route path='/' element={ <HeroesComponent/> }/>
            <Route path="info/:id" element={ <HeroItem/> }/>
        </Routes>
    </Router>
    )
}