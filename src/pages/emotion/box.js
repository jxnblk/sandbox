import styled from '@emotion/styled'

export default styled.div(props => console.log(props.theme) || ({
  fontSize: 32,
  fontWeight: 'bold',
  color: props.theme.color,
}))
