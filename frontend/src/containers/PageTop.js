import React, {useEffect, useState} from "react";
import {Container, BreadCrumbs, Button} from "@moosty/dao-storybook";
import {Filters} from "./Filters";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";

export const PageTop = ({updateFilters, filters, changeToggle}) => {
  const history = useHistory();
  const location = useLocation();
  const [crumbs, setCrumbs] = useState([]);
  const [filtersHidden, setFiltersHidden] = useState(false);
  const [toggleHidden, setToggleHidden] = useState(true);
  const matches = {
    explore: useRouteMatch("/explore/:args"),
  }

  useEffect(() => {
    const paths = location.pathname.split("/");
    let arg = ""
    const pathname = paths.length <= 2 ? location.pathname : Object.keys(matches).map(page => {
      if (matches[page]?.isExact) {
        arg = matches[page]?.params;
        return matches[page]?.path;
      }
      return null
    }).find(Boolean)

    switch (pathname) {
      case "/explore":
        setFiltersHidden(true);
        setCrumbs([
          {
            name: "Home",
            onClick: () => history.push("/"),
          },
          {
            name: "Explore Projects",
            onClick: () => history.push("/explore"),
          }
        ])
        setToggleHidden(true)
        break;
      case "/explore/:args":
        setFiltersHidden(true);
        setCrumbs([
          {
            name: "Home",
            onClick: () => history.push("/"),
          },
          {
            name: "Explore Projects",
            onClick: () => history.push("/explore"),
          },
          {
            name: arg.args,
            onClick: () => history.push(location.pathname),
          },
        ])
        setToggleHidden(true)
        break;
      case "/my-projects":
        setFiltersHidden(true);
        setCrumbs([
          {
            name: "Home",
            onClick: () => history.push("/"),
          },
          {
            name: "My Projects",
            onClick: () => history.push("/my-projects"),
          }
        ])
        setToggleHidden(true)
        break;
      case "/create-crowdfund":
        setFiltersHidden(true);
        setCrumbs([
          {
            name: "Home",
            onClick: () => history.push("/"),
          },
          {
            name: "Crowdfunds",
            onClick: () => history.push("/"),
          },
          {
            name: "Create Crowdfund",
            onClick: () => history.push("/create-crowdfund"),
          },
        ])
        setToggleHidden(true)
        break;
      default:
        setFiltersHidden(true);
        setCrumbs([])
        setToggleHidden(true)
        break;
    }
  }, [location]);

  return (<Container className="flex flex-row my-4 ">
    <BreadCrumbs crumbs={crumbs} className="flex-start w-full"/>
    <Filters selectedItems={filters} updateFilters={updateFilters} hidden={filtersHidden} className="flex flex-row justify-end w-full" />
    {!toggleHidden && <Button label="Toggle View" onClick={changeToggle} />}
  </Container>)
}