import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import { getEvent, deleteEvent, putEvent } from '../actions'

class EventsShow extends Component {

  // イニシャライズしたときにonSubmitをバインドしてonSubmitのメソッドを使えるようにする
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field
    // 一回でもフォームに触ったらtouched状態になる

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }

  async onDeleteClick() {
    // 現在持ってるパラメーターを拾う
    // console.log(this.props.match)

    // idを取得
    const { id } = this.props.match.params
    // console.log(id)

    await this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  // 非同期処理
  async onSubmit(values) {
    // await this.props.postEvent(values)
    // 履歴にトップページをpush（トップページに遷移する）
    this.props.history.push('/')
  }

  render() {
    // handleSubmit関数はrenderが実行されたときに渡ってくるのでここで取得
    // pristine 何も入力してない状態を示す属性
    // submitting submitボタンが押されたらtrueになる
    const { handleSubmit, pristine, submitting } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
        <div><Field label="Body" name="body" type="text" component={this.renderField} /></div>

        <div>
          <input type="submit" value="Submit" disabled={pristine || submitting} />
          <Link to="/" >Cancel</Link>
          <Link to="/" onClick={this.onDeleteClick} >Delete</Link>
        </div>
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

const mapDispatchToProps = ({ deleteEvent })

// connectでpostEventをバインドしてコンポーネントにActionを関連付ける
// この画面ではeventsに関する描画しないのでmapStateToPropsは不要(null)
export default connect(null, mapDispatchToProps)(
  // reduxForm関数でデコレート
  //（reduxForm関数で返ってくる関数の引数にEventsNewを渡す）
  reduxForm({ validate, form: 'eventShowForm' })(EventsShow)
)
