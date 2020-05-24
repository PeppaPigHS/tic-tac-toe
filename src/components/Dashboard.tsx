import React, { useState, useCallback } from 'react'

import { Select, Text, Flex, Button } from '@chakra-ui/core'

import { Game } from './Game'

export const Dashboard = () => {
  const [tableSize, setTableSize] = useState<number>(3)
  const [state, setState] = useState<number>(0)

  const arr = [3, 4, 5, 6]

  const updateSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableSize(parseInt(event.target.value))
  }

  const resetGame = () => {
    setState(1 - state)
  }

  const GameTable = useCallback(() => {
    return <Game size={tableSize} />
  }, [tableSize, state])

  return (
    <React.Fragment>
      <Flex direction="column" align="center" p={4}>
        <Text fontSize="5xl">Tic Tac Toe</Text>
        <Select
          placeholder="Select table size"
          onChange={updateSize}
          defaultValue="3"
          width={['100%', 1 / 2, 1 / 4]}
          mt={4}
        >
          {arr.map((key: number) => {
            return <option key={key.toString()}>{key}</option>
          })}
        </Select>
        <GameTable />
        <Button
          mt={4}
          variantColor="teal"
          width={['100%', 1 / 2, 1 / 4]}
          onClick={resetGame}
        >
          Reset
        </Button>
      </Flex>
    </React.Fragment>
  )
}
