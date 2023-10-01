<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div id="archive-content">
    <div id="select_year">
      发表年份：
      <el-select
        v-model="select_year"
        placeholder="请选择年份"
        @change="selectChange"
      >
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>

    <!--  height: '800px' -->
    <div ref="heatmap" :style="{ width: '100%' }"></div>
    <el-divider class="total-divider" content-position="center">
      <span style="color: #35b8ff; font-size: 2em"
        >{{ select_year }} : 共 {{ totalNum }} 篇</span
      >
    </el-divider>
    <div v-for="(list, index) in blogList" :key="index">
      <el-divider content-position="center">
        <span style="color: #35b8ff; font-size: 1.2em"
          >{{ list.yearMonth.toString().substring(0, 4) }}-{{
            list.yearMonth.toString().substring(4, 6)
          }}: {{ list.content.length }} 篇</span
        >
      </el-divider>
      <el-card>
        <el-timeline>
          <el-timeline-item
            class="my-timeline-item"
            v-for="(blog, index1) in list.content"
            :key="index1"
            :timestamp="blog.createTime.substr(5, 99)"
          >
            <nuxt-link
              class="article-title-link"
              :to="{ path: '/blog/' + blog.id }"
              >{{ blog.name }}</nuxt-link
            >
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts from "~/assets/js/echarts.min.js";
export default {
  name: "Archive",
  components: {},
  mounted() {
    this.blogList = this.initBlogList;
    let heatMapCurrentYearData = this.handleCurrentYearHeatmapData(new Date().getFullYear());
    this.drawLineThisYear(heatMapCurrentYearData);

    // 查找所有的年份，渲染下拉框
    this.$axios
      .get("/archive/years")
      .then((res) => {
        this.yearList = res.years;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    // 根据所选择的年份绘制热力图
    drawLineThisYear(heatMapCurrentYearData) {
      this.$refs.heatmap.style.height = "230px";
      this.heatmapOption.calendar = [
        {
          top: 120,
          left: "10%",
          right: "10%",
          cellSize: ["auto", 13],
          // 范围
          range: [this.select_year.toString()],
          itemStyle: {
            borderWidth: 0.5,
          },
          dayLabel: {
            nameMap: "ZH",
          },
          monthLabel: {
            nameMap: "ZH",
          },
          yearLabel: {
            show: true,
            margin: 15,
            color: "#ccc",
            fontFamily: "sans-serif",
            fontWeight: "bolder",
            position: null,
            formatter: null,
            fontSize: 20,
          },
        },
      ];
      this.heatmapOption.series = [
        {
          calendarIndex: 0,
          type: "heatmap",
          coordinateSystem: "calendar",
          data: heatMapCurrentYearData,
        },
      ];
      this.drawLine();
    },
    // 用户选择下拉框，换了一个年份
    selectChange(newYear) {
      this.$axios
        .post("/archive", {
          data: newYear,
        })
        .then((res) => {
          this.blogList = res.blogs;
          let heatMapCurrentYearData =
            this.handleCurrentYearHeatmapData(newYear);
          this.drawLineThisYear(heatMapCurrentYearData);
        })
        .catch((e) => {});
    },
    applicationPre() {
      console.log(process.env.NODE_ENV);
      // return process.env.NODE_ENV === "production" ? "/blog" : "";
      return "/blog";
    },
    handleCurrentYearHeatmapData(currentYear) {
      let date = +echarts.number.parseDate(currentYear + "-01-01");
      let end = +echarts.number.parseDate(+currentYear + 1 + "-01-01");
      let dayTime = 3600 * 24 * 1000;
      let data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.format.formatTime("yyyy-MM-dd", time),
          // 初始化每天 0 篇文章
          0,
        ]);
      }
      for (let idx = 0; idx < this.blogList.length; idx++) {
        let content = this.blogList[idx].content;
        content.forEach((blog) => {
          let offset = parseInt((new Date(blog.createTime) - date) / dayTime);
          data[offset][1]++;
        });
      }
      return data;
    },
    drawLine() {
      let theme = window.document.documentElement.getAttribute("data-theme");
      this.heatmap = echarts.init(this.$refs.heatmap, theme);
      this.heatmap.setOption(this.heatmapOption);
      //做到每个图表根据屏幕变化而自适应宽高
      window.addEventListener("resize", () => {
        this.heatmap.resize();
      });
    },
  },
  activated() {
    document.title = "归档";
  },
  computed: {
    totalNum() {
      let total = 0;
      this.blogList.forEach((element) => {
        total += element.content.length;
      });
      return total;
    },
    totalYear() {
      let yearSet = new Set();
      this.blogList.forEach((element) => {
        yearSet.add(parseInt(parseInt(element.yearMonth) / 100));
      });
      return yearSet.size;
    },
  },
  props: {
    initBlogList: {
      type: Array,
      default: () => {
        return [
          {
            yearMonth: "",
            content: [
              { id: 0, name: "", createTime: "2021-02-13T09:30:29.000+08:00" },
            ],
          },
        ];
      },
    },
  },
  data() {
    return {
      select_year: new Date().getFullYear().toString(),
      yearList: [],
      heatmapDataByYear: {},
      heatmapData: [],
      heatmapOption: {
        darkMode: true,
        title: {
          top: 30,
          left: "center",
          text: "更新频率",
        },
        tooltip: {
          position: "top",
          formatter: (p) => {
            let format = echarts.format.formatTime("yyyy-MM-dd", p.data[0]);
            return format + ": " + p.data[1] + "篇";
          },
        },
        visualMap: {
          type: "piecewise",
          orient: "horizontal",
          left: "center",
          top: 65,
          pieces: [
            { gte: 4, color: "#006600", label: "可能有误" },
            { min: 3, max: 3, color: "#30a14e", label: "火力全开" },
            { min: 2, max: 2, color: "#40c463", label: "不太可能" },
            { min: 1, max: 1, color: "#9be9a8", label: "终于写了" },
            { lte: 0, color: "#ebedf0", label: "懒人一个" },
          ],
        },
        calendar: [],
        series: [],
      },
      blogList: [
        {
          yearMonth: "",
          content: [
            {
              id: 0,
              name: "",
              createTime: "2021-02-13T09:30:29.000+08:00",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.article-title-link {
  position: relative;
  /* text-align: center; */
}

.article-title-link:hover::after {
  left: 0%;
  width: 100%;
}
.my-timeline-item {
  font-size: 16px;
}
.total-divider {
  margin-bottom: 30px;
}
</style>
<style scoped lang="scss">
@import "~/assets/scss/common/common.scss";

.el-card {
  @include background_color("bold_white_tini_tini_black_color");
  @include font_color("text-color");
}
a,
a:link,
a:visited,
a:focus {
  text-decoration: none;
  @include font_color("small_black_color");
}
.article-title-link::after {
  content: "";
  width: 0;
  height: 3px;
  @include background_color("bold_black_color");
  position: absolute;
  top: 100%;
  left: 50%;
  transition: all 0.5s;
}
#select_year {
  text-align: center;
  margin-top: 10px;
}
</style>