import React from 'react'
import { useStore } from '../store';
import ListVarients from './ListVarients';

export default function Grid() {
  const { state } = useStore();

  return (
    <ListVarients selectedMenuOption={state.selectedMenuOption} />
  )
}
