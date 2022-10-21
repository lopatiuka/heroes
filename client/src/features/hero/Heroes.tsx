import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Container, Pagination, Row } from "react-bootstrap";
import { createHeroForm, heroesSlice, IHero, selectDisplayHeroes, selectHeroes } from './heroesSlice';
import { sagaActions } from "./sagaActions";
import { HeroFormComponent } from "./heroForm";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export function HeroesComponent() {
  const heroes = useSelector(selectHeroes);
  const displayHeroes = useSelector(selectDisplayHeroes);
  const dispatch = useDispatch();
  var [active, setActive] = useState(1);
  let isCreateHeroFormVisible = useSelector(createHeroForm);

  var pages = [];
  const countPerPage = 5;
  const totalHeroes = [];

  for (let number = 1; number <= heroes.length; number++) {
    totalHeroes.push(number);
  }

  var lastElem = active * countPerPage;
  var firstElem = lastElem - countPerPage;

  console.log("first", totalHeroes.slice(firstElem, lastElem));

  for (let number = 1; number <= Math.floor(heroes.length/countPerPage) + 1; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => pagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    dispatch(heroesSlice.actions.hideEditHeroForm());
  },[])

  function pagination(number: number) {
    lastElem = number * countPerPage;
    firstElem = lastElem - countPerPage;
    setActive(number);
    dispatch(heroesSlice.actions.setDisplayHeroes({firstElem, lastElem}));
  }

  return (<Container className="heroes-list my-2 p-2">
  {isCreateHeroFormVisible ? <HeroFormComponent class="hero-form hero-form--create" actionType = {sagaActions.CREATE_HERO}/> : null}
  <Button variant="contained" color="success" onClick={ e => dispatch(heroesSlice.actions.showCreateHeroForm())}>Create Hero</Button>
  <Grid container direction="row" justifyContent="center" alignItems="center" className="p-2">
  {
    displayHeroes.map( (item: IHero) => {
      return <Grid item sm={ 2 } key={ item.id } className="item mb-5">
        <NavLink to={`info/${item.id}`}>
          <Card>
            <h3 className="text-center">{ item.nickname }</h3>
              <Card.Body>
              {item.images ? <img style={{maxWidth: 100}} src={`http://localhost:5000/${item.images[0]}`} alt="" /> : null}
              </Card.Body>
          </Card>
          </NavLink>
          <Button className="mt-2" onClick = {e => {
            lastElem++;
            dispatch({type: sagaActions.DELETE_HERO, payload:{id: item.id, lastElem: lastElem}})} 
          } variant="outlined" startIcon={<DeleteIcon />} color="error">Delete</Button>
      </Grid>
    })
  }
  </Grid>
    <Pagination size="sm">
      <Pagination.Prev
        onClick={() => {
          if (active > 1) {
            pagination(active - 1);
          }
        }}
      />
      {pages}
      <Pagination.Next
        onClick={() => {
          if (active < pages.length) {
            pagination(active + 1);
          }
        }}
      />
    </Pagination>
    </Container>
  );
}