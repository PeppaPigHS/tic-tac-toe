import React, { useState, useEffect } from 'react'

import { Flex, Text, Button, Alert, AlertIcon } from '@chakra-ui/core'

interface IGame {
  size: number
}

interface IState {
  table: number[][]
  color: number[][]
  turn: number
  enable: boolean
  message: string
}

const initialState: IState = {
  table: [],
  color: [],
  turn: 0,
  enable: true,
  message: null,
}

export const Game = (props: IGame) => {
  const [state, setState] = useState<IState>(null)

  const mp: string[] = ['X', 'O', ' ']

  useEffect(() => {
    if (!props.size) return

    let currentState: IState = initialState

    let table: number[][] = []
    let color: number[][] = []
    for (let i = 0; i < props.size; i++) {
      let rowTable: number[] = []
      let rowColor: number[] = []
      for (let j = 0; j < props.size; j++) {
        rowTable.push(2)
        rowColor.push(0)
      }
      table.push(rowTable)
      color.push(rowColor)
    }
    setState({ ...currentState, table: table, color: color })
  }, [])

  useEffect(() => {
    if (!state || !state.table || !state.color) return
    if (state.enable == false) return

    for (let i = 0; i < props.size; i++)
      if (state.table[i][0] != 2) {
        let valid: Boolean = true
        for (let j = 0; j < props.size; j++)
          if (state.table[i][j] != state.table[i][0]) valid = false
        if (valid == true) {
          let newColor: number[][] = [...state.color]
          for (let j = 0; j < props.size; j++) newColor[i][j] = 1
          setState({
            ...state,
            color: newColor,
            enable: false,
            message: `Player ${mp[state.table[i][0]]} wins!`,
          })
          return
        }
      }

    for (let i = 0; i < props.size; i++)
      if (state.table[0][i] != 2) {
        let valid: Boolean = true
        for (let j = 0; j < props.size; j++)
          if (state.table[j][i] != state.table[0][i]) valid = false
        if (valid == true) {
          let newColor: number[][] = [...state.color]
          for (let j = 0; j < props.size; j++) newColor[j][i] = 1
          setState({
            ...state,
            color: newColor,
            enable: false,
            message: `Player ${mp[state.table[0][i]]} wins!`,
          })
          return
        }
      }

    if (state.table[0][0] != 2) {
      let valid: Boolean = true
      for (let i = 0; i < props.size; i++)
        if (state.table[i][i] != state.table[0][0]) valid = false
      if (valid == true) {
        let newColor: number[][] = [...state.color]
        for (let i = 0; i < props.size; i++) newColor[i][i] = 1
        setState({
          ...state,
          color: newColor,
          enable: false,
          message: `Player ${mp[state.table[0][0]]} wins!`,
        })
        return
      }
    }

    if (state.table[0][props.size - 1] != 2) {
      let valid: Boolean = true
      for (let i = 0; i < props.size; i++)
        if (
          state.table[i][props.size - i - 1] != state.table[0][props.size - 1]
        )
          valid = false
      if (valid) {
        let newColor: number[][] = [...state.color]
        for (let i = 0; i < props.size; i++) newColor[i][props.size - i - 1] = 1
        setState({
          ...state,
          color: newColor,
          enable: false,
          message: `Player ${mp[state.table[0][props.size - 1]]} wins!`,
        })
        return
      }
    }

    if (state.turn == props.size * props.size) {
      setState({ ...state, enable: false, message: 'Draw!' })
      return
    }
  }, [state])

  const update = (row: number, col: number) => {
    let now: number[][] = [...state.table]
    if (now[row][col] == 2) {
      now[row][col] = state.turn % 2
      setState({ ...state, table: now, turn: state.turn + 1 })
    }
  }

  if (!props.size || !state || !state.table)
    return <React.Fragment></React.Fragment>

  return (
    <Flex direction="column" alignItems="center">
      <Text fontSize="xl" m={4}>
        Player's Turn: {mp[state.turn % 2]}
      </Text>
      {state.table.map((row: number[], index1: number) => {
        return (
          <Flex key={index1} direction="row" alignItems="center">
            {row.map((value: number, index2: number) => {
              return (
                <Button
                  m={1}
                  p={0}
                  w={16}
                  h={16}
                  key={index2}
                  isDisabled={!state.enable}
                  variant="outline"
                  variantColor={
                    state.color[index1][index2] == 1 ? 'red' : 'gray'
                  }
                  onClick={() => update(index1, index2)}
                >
                  {mp[value]}
                </Button>
              )
            })}
          </Flex>
        )
      })}
      {state.message ? (
        <Alert status="success" mt={4}>
          <AlertIcon />
          {state.message}
        </Alert>
      ) : null}
    </Flex>
  )
}
