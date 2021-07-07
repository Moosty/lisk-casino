import React, {useEffect, useState} from "react";
import {FilterWrapper} from "@moosty/dao-storybook";
import {allDaoData} from "@moosty/dao-storybook/dist/fixtures/daos";
import {allMembers} from "@moosty/dao-storybook/dist/fixtures/members";
import {allVotingTypes} from "@moosty/dao-storybook/dist/fixtures/votingTypes";
import {useDaos} from "../hooks/daos";
import {useMembers} from "../hooks/members";

export const Filters = ({hidden, updateFilters, selectedItems}) => {
  const {daos} = useDaos();
  const {members} = useMembers();
  const [filters, setFilters] = useState(null)

  useEffect(() => {
    if (members?.length > 0 && daos?.length > 0 && !filters) {
      setFilters([
        {
          filter: "dao",
          onChange: (value) => updateFilters("dao", value, selectedItems),
          label: "Select DAO",
          items: [allDaoData[0], ...daos].map(d => ({
            id: d.id,
            name: d.name,
            icon: `https://avatar.moosty.com/${d.id}`,
          })),
          selected: filters?.[0]?.selected || allDaoData[0],
        },
        {
          filter: "creator",
          onChange: (value) => updateFilters("creator", value, selectedItems),
          label: "Initiated by Anyone",
          items: [{
            ...allMembers[0],
            icon: 'https://avatar.moosty.com/1',
          },
            ...members],
          selected: {
            icon: 'https://avatar.moosty.com/1',
            ...(filters?.[1]?.selected ? filters?.[1]?.selected : allMembers[0]),
          },
        },
        {
          filter: "state",
          onChange: (value) => updateFilters("state", value, selectedItems),
          label: "Open and Closed",
          items: allVotingTypes,
          selected: filters?.[2]?.selected || allVotingTypes[1],
        },
      ])
    }
  }, [members, daos])
  //
  // useEffect(() => {
  //   if (filters && selectedItems) {
  //     setFilters(filters.map(f => ({
  //       ...f,
  //       selected: selectedItems[f.filter] || f.selected,
  //     })))
  //   }
  // }, [selectedItems])

  return (<div className={hidden && 'hidden'}>
    <FilterWrapper filters={filters?.map(f => ({
      ...f,
      onChange: (value) => updateFilters(f.filter, value, selectedItems),
      selected: selectedItems?.[f.filter] || f.selected,
    }))} defaultShow={false}/>
  </div>)
}