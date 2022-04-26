<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation @childClick="navigationClick"></navigation>
    <middle-content  @childPageChange="currentChange" :page="info" class="mainBody" />
    <!-- <div>{{blogList}}</div> -->
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import axios from "axios";
import Navigation from "~/components/Navigation.vue";

import BlogFooter from "~/components/Footer.vue";
import ToTop from "~/components/ToTop.vue";
import MiddleContent from "~/components/MiddleContent.vue";
export default {
  name: "Blog",
  components: {
    Navigation,
    BlogFooter,
    ToTop,
    MiddleContent
  },
  mounted() {
  },

  asyncData(context) {
    return context.$axios
      .get("/blog/blogPage", {
        params: {
          pageNum: 1,
          pageSize: 5
        }
      })
      .then(res => {
        console.log(res);
        return {
          info: res.page
        };
      });
  },
  data() {
    return {
      info: {
          pageNum: 1,
          pageSize: 5,
          totalSize: 10,
          totalPages: 0,
          content: [
                       {
              id: 1,
              name: "",
              content: "",
              description: "",
              createTime: "2021-02-09T08:57:19.000+00:00",
              updateTime: "2021-02-09T08:57:19.000+00:00",
              category: {
                id: 1,
                name: ""
              },
              tags: [
                {
                  id: 1,
                  name: ""
                }
              ]
            }
          ]
        }
    };
  },
  methods: {
    navigationClick(index) {
      switch (index) {
        case "1":
          if (this.$route.path == "/home") break;
          this.$router.push("/home").catch(e => {});
          break;
        case "2":
          if (this.$route.path == "/category") break;
          this.$router.push("/category/-1").catch(e => {});
          break;
        case "3":
          if (this.$route.path == "/tag") break;
          this.$router.push("/tag/-1").catch(e => {});
          break;
        case "4":
          if (this.$route.path == "/link") break;
          this.$router.push("/link").catch(e => {});
          break;
        case "5":
          if (this.$route.path == "/talk") break;
          this.$router.push("/talk").catch(e => {});
          break;
        case "6":
          if (this.$route.path == "/archive") break;
          this.$router.push("/archive").catch(e => {});
          break;
        case "7":
          if (this.$route.path == "/search") break;
          this.$router.push("/search").catch(e => {});
          break;
        default:
          if (this.$route.path == "/home") break;
          this.$router.push("/home").catch(e => {});
      }
    },
    currentChange(newIndex) {
      console.log(newIndex);
        
        this.$axios
          .get("/blog/blogPage", {
            params: {
              pageNum: newIndex,
              pageSize: this.info.pageSize
            }
          })
          .then(res => {
            this.info = res.page;
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  created() {}
};
</script>