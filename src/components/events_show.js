import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { getEvent, deleteEvent, putEvent } from '../actions'

class EventsShow extends Component {

  // イニシャライズしたときにonSubmitをバインドしてonSubmitのメソッドを使えるようにする
  // DOM挿入前の初期化時に呼ばれる
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  // renderメソッドによるDOM挿入直後に呼ばれる
  componentDidMount() {
    const {id} = this.props.match.params
    if (id) this.props.getEvent(id) // getEventはActionから引っ張ってくるアクション
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
      // <div>
      //   <input {...input} placeholder={label} type={type} />
      //   {touched && error && <span>{error}</span>}
      // </div>
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
    await this.props.putEvent(values)
    // 履歴にトップページをpush（トップページに遷移する）
    this.props.history.push('/')
  }

  render() {
    // handleSubmit関数はrenderが実行されたときに渡ってくるのでここで取得
    // pristine: 何も入力してない状態を示す属性
    // submitting: submitボタンが押されたらtrueになる
    // invalid: バリデーションエラーがある場合
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 12 }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
        <div><Field label="Body" name="body" type="text" component={this.renderField} /></div>
        <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
        <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
        <RaisedButton label="Delete" style={style} onClick={this.onDeleteClick} />
        {/* <div>
          <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
          <Link to="/" >Cancel</Link>
          <Link to="/" onClick={this.onDeleteClick} >Delete</Link>
        </div> */}
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

// 現時点のstateとこのコンポーネントが持ってるpropsを引数で渡す
const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]

  // 初期状態でどんな値を渡すかを設定
  return { initialValues: event, state }
}

// コンポーネントに使用するEventをバインド
const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

// connectでpostEventをバインドしてコンポーネントにActionを関連付ける
// mapStateToProps: reducer側のイベント情報をバインド
export default connect(mapStateToProps, mapDispatchToProps)(
  // reduxForm関数でデコレート
  //（reduxForm関数で返ってくる関数の引数にEventsNewを渡す）
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)
  // enableReinitialize: trueにするとinitialValuesの値が変わる度にフォームが初期化される（指定がなければfalse）
  // 詳細画面に遷移した時はメモリ上にある該当のイベント情報をpropとして初期化される(古いイベント情報でいったん初期化される)
  // componentDidMountのgetEventで該当のイベント情報を取りに行き、reducerがイベント情報を内部的に更新するが、
  // trueにすることで、その更新によって再初期化をする設定になる。変更が発生する度に再初期化をしてくれる。
  // falseだと他の人が更新した際に内部的には更新するが画面表示は古いまま
)
