import { Col, Row, Card, Progress, Statistic, Timeline } from "antd";
import {
  RadarChartOutlined,
  PieChartOutlined,
  FundFilled,
  FundOutlined,
  GithubOutlined,
  HeatMapOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import Echarts1 from "./components/echarts1";
import Echarts2 from "./components/echarts2";
const option = {
  // title: {
  //   text: 'Stacked Line'
  // },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Email",
      type: "line",
      stack: "Total",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Union Ads",
      type: "line",
      stack: "Total",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};
function DashBoard() {
  return (
    <div className="dashboard">
      <Row gutter={[16, 16]}>
        <Col sm={12} md={6}>
          <Card>
            <div className="flex f-a-center f-j-between">
              <div>
                <h2>Card</h2>
                <p>园区面积：10000</p>
              </div>
              <RadarChartOutlined className="f32" />
            </div>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card>
            <div className="flex f-a-center f-j-between">
              <div>
                <h2>Card</h2>
                <p>园区面积：10000</p>
              </div>
              <FundOutlined className="f32" />
            </div>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card>
            <div className="flex f-a-center f-j-between">
              <div>
                <h2>Card</h2>
                <p>园区面积：10000</p>
              </div>
              <HeatMapOutlined className="f32" />
            </div>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card>
            <div className="flex f-a-center f-j-between">
              <div>
                <h2>Github</h2>
                <a
                  href="https://github.com/OliverEChen/react-app"
                  target="_blank"
                  rel="noreferrer"
                >
                  react-app
                </a>
              </div>
              <GithubOutlined className="f32" />
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mg-t20">
        <Col span={12}>
          <Card title="能源消耗情况">
            <ReactECharts option={option} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Echarts1">
            <Echarts1 />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Echarts2">
            <Echarts2 />
          </Card>
        </Col>
        <Col span={12}>
        <Row gutter={8}>

          <Col span={12}>
            <Card title="extra">
              <div className="flex f-d-column f-j-center f-a-center">
                <Progress type="circle" percent={75}></Progress>
                <Statistic title="react" value={95} suffix="/ 100"></Statistic>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="extra">
            <Timeline
                  items={[
                    {
                      color: "green",
                      children: "Create a services site 2015-09-01",
                    },
                    {
                      color: "green",
                      children: "Create a services site 2015-09-01",
                    },
                    {
                      color: "red",
                      children: (
                        <>
                          <p>Solve initial network problems 1</p>
                          <p>Solve initial network problems 2</p>
                          <p>Solve initial network problems 3 2015-09-01</p>
                        </>
                      ),
                    },
                    {
                      children: (
                        <>
                          <p>Technical testing 1</p>
                          <p>Technical testing 2</p>
                          <p>Technical testing 3 2015-09-01</p>
                        </>
                      ),
                    },
                    {
                      color: "gray",
                      children: (
                        <>
                          <p>Technical testing 1</p>
                          <p>Technical testing 2</p>
                          <p>Technical testing 3 2015-09-01</p>
                        </>
                      ),
                    },
                    {
                      color: "gray",
                      children: (
                        <>
                          <p>Technical testing 1</p>
                          <p>Technical testing 2</p>
                          <p>Technical testing 3 2015-09-01</p>
                        </>
                      ),
                    },
                    {
                      color: "#00CCFF",
                      dot: <SmileOutlined />,
                      children: <p>Custom color testing</p>,
                    },
                  ]}
                />
            </Card>
          </Col>
        </Row>

        </Col>
      </Row>
    </div>
  );
}
export default DashBoard;
