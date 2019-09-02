import React from 'react'
import PropTypes from 'prop-types'

const NetlifyForm = (props) => {
  const [botfield, handleChange] = React.useState(null)
  
  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    if (botfield) {
      return
    }
    fetch(props.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...botfield,
        ...props.fields,
      }),
    })
      .then(response => {
        props.onSubmit(response)
      })
      .catch(error => {
        console.log('Error: ', error)
      })
  }

  return (
    <form
      name={props.name}
      method="post"
      action={props.action}
      data-netlify="true"
      data-netlify-honeypot={`bot-field-${props.name}`}
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value={props.name} />
      <label hidden>
        Don’t fill this out:{' '}
        <input name={`bot-field-${props.name}`} onChange={(e) => handleChange({ [e.target.name]: e.target.value })} />
      </label>
      {props.children}
    </form>
  )
}

NetlifyForm.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  fields: PropTypes.object.isRequired,
}

export default NetlifyForm