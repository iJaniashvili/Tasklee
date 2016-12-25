// @flow

import React, { Component } from 'react'
import styled from 'styled-components/native'
import { TextInput } from 'react-native'
import Radio from 'Tasklee/src/components/Radio'

const TaskItem = styled.View`
  background-color: white;
  height: 60;
  border-bottom-width: 1;
  border-color: #E8DCDD;
  flex-direction: row;
  align-items: center;
  padding-left: 15;
  padding-right: 15;
`

const Text = styled.Text`
  font-size: 17;
  color: #030303;
  text-decoration-line: ${props => props.isCompleted ? 'line-through' : 'none'};
  text-decoration-style: solid;
  text-decoration-color: #DB2B39;
`

// const TextInput = styled.TextInput`
//   flex: 1;
// `

export default class Task extends Component {
  componentDidMount () {
    if (this.refs.input) {
      this.refs.input.focus()
    }
  }

  render () {
    const {
      text, isEdit, isCompleted,
      onSubmitEditing, onRadioClick
    } = this.props

    const radioType = isCompleted ? 'selected' : 'normal'

    return (
      <TaskItem>
        <Radio type={radioType} onRadioClick={onRadioClick} />
        { isEdit ?
          <TextInput
            style={{flex: 1}}
            ref='input'
            defaultValue={text}
            placeholder='Type in your priority task'
            returnKeyType='done'
            onSubmitEditing={({ nativeEvent: e }) => onSubmitEditing(e.text)}
          />
        : <Text isCompleted={isCompleted}>{text}</Text>
        }
      </TaskItem>
    )
  }
}
