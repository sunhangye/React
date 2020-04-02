import React, { Component } from "react";
import { Card, Row, Col, Skeleton, Icon } from "antd";
import { connect } from "dva";
import { TagSelect } from "ant-design-pro";

@connect(
  state => ({
    courses: state.goods.courses,
    tags: state.goods.tags,
    loading: state.loading
  }),
  {
    getList: () => ({
      type: "goods/getList"
    }),
    addCart: payload => ({
      type: "cart/addCart",
      payload
    })
  }
)
class Goods extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayCourses: new Array(8).fill({}) 
    }
    
  }
  componentDidMount() {
    this.props.getList()
    
  }
  addCart = (e, good) => {
    e.stopPropagation()
    this.props.addCart(good)
  }
  componentWillReceiveProps(props) {
    if (props.tags.length) {
      this.tagSelectChange(props.tags, props.courses);
    }
  }
  
  tagSelectChange = (tags, courses = this.props.courses) => {

    const displayCourses = tags.flatMap(tag => courses[tag]);

    this.setState({displayCourses});
  }
  render() {
    //console.log(this.props.loading);
    if (this.props.loading.models.goods) {
      return <div>加载中...</div>
    }

    return (
      <div>
        {/* 分类标签 */}
        <TagSelect onChange={this.tagSelectChange}>
          {this.props.tags.map(tag => {
            return (
              <TagSelect.Option key={tag} value={tag}>
                {tag}
              </TagSelect.Option>
            );
          })}
        </TagSelect>
        {/* 商品列表 */}
        <Row type="flex" justify="start">
        {this.state.displayCourses.map((item, index) => {
          return (
            <Col key={index} style={{ padding: 10 }} span={6}>
              {
                item.name ? (
                  <Card
                    hoverable
                    title={item.name}
                    cover={<img src={"/course/" + item.img} />}
                    extra={
                      <Icon
                        onClick={e => this.addCart(e, item)}
                        type="shopping-cart"
                        style={{ fontSize: 18 }}
                      />
                    }
                  >
                    <Card.Meta
                      description={
                        <div>
                          <span>￥{item.price}</span>
                          <span style={{ float: "right" }}>
                            <Icon type="user" /> {item.solded}
                          </span>
                        </div>
                      }
                    />
                    <div />
                  </Card>
                ) : (
                  <Skeleton active={true} />
                )
              }
            </Col>
          )
        })}
        </Row>
      </div>
    );
  }
}

// const mapState = state => ({
//   courses: state.goods.courses,
//   tags: state.goods.tags,
//   loading: state.loading
// })
// const mapDispatch = () => ({
//   getList: () => ({
//     type: "goods/getList"
//   }),
// })
// export default connect(mapState, mapDispatch)(Goods);
export default (Goods);



function sleep(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration)
  })
}

async function changeColor(color, duration) {
  document.getElementById("traffic-light").style.background = color;
  await sleep(duration)
}

async function main() {
  while(true){
    await changeColor(3000,"green");
    await changeColor(1000, "yellow");
    await changeColor(2000, "red");
  }
}

main()
