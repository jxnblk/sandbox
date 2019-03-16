import styled from '@emotion/styled'

export default styled.div(props => console.log('Box', props.theme) || ({
  fontSize: 32,
  fontWeight: 'bold',
  color: props.theme.color,
}))
