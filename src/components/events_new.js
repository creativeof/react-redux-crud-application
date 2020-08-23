import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { postEvent } from '../actions'

class EventsNew extends Component {

  // イニシャライズしたときにonSubmitをバインドしてonSubmitのメソッドを使えるようにする
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field
    // 一回でもフォームに触ったらtouched状態になる

    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    )
  }

  // 非同期処理
  async onSubmit(values) {
    await this.props.postEvent(values)
    // 履歴にトップページをpush（トップページに遷移する）
    this.props.history.push('/')
  }

  render() {
    // handleSubmit関数はrenderが実行されたときに渡ってくるのでここで取得
    // pristine 何も入力してない状態を示す属性
    // submitting submitボタンが押されたらtrueになる
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 12 }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
        <div><Field label="Body" name="body" type="text" component={this.renderField} /></div>
        <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
        <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
      </form>
    )
  }
}

// valuesには入力されてる値が渡ってくる
const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "Enter a title, please."
  if (!values.body) errors.body = "Enter a body, please."

  return errors
}

// popsとeventをマッピング
const mapDispatchToProps = ({ postEvent })

// connectでpostEventをバインドしてコンポーネントにActionを関連付ける
// この画面ではeventsに関する描画しないのでmapStateToPropsは不要(null)
export default connect(null, mapDispatchToProps)(
  // reduxForm関数でデコレート（デコレートしないとFieldコンポーネントは使えない）
  // reduxForm関数で返ってくる関数の引数にEventsNewを渡す
  // reduxForm関数の引数には設定に関するオブジェクトを渡す
  reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
)
