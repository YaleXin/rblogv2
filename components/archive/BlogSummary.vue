<template>
    <div class="blog-summary-table" style="height: 250px;width: 95%;">
            <el-table :data="summaryTableData" border style="width: 100%" height="240">
                <el-table-column prop="itemName1" label="项目名">
                </el-table-column>
                <el-table-column prop="itemValue1" label="项目值">
                    <template slot-scope="scope">
                        <span style="color: #35b8ff; font-size: 1.5em">
                            <count-to v-if="!isNaN( scope.row.itemValue1) && !isNaN(parseFloat( scope.row.itemValue1)) && isFinite( scope.row.itemValue1)" :startVal='0' :endVal='scope.row.itemValue1'
                                :duration='3000'></count-to>
                            <span v-else>
                                 {{ scope.row.itemValue1 }}
                            </span>
                           
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="itemName2" label="项目名">
                </el-table-column>
                <el-table-column prop="itemValue2" label="项目值">
                    <template slot-scope="scope">
                        <span style="color: #35b8ff; font-size: 1.5em">
                            <count-to v-if="!isNaN( scope.row.itemValue2) && !isNaN(parseFloat( scope.row.itemValue2)) && isFinite( scope.row.itemValue2)" :startVal='0' :endVal='scope.row.itemValue2'
                                :duration='3000'></count-to>
                            <span v-else>
                                 {{ scope.row.itemValue2 }}
                            </span>
                           
                        </span>
                    </template>
                </el-table-column>
            </el-table>

    </div>

</template>

<script>
import CountTo from 'vue-count-to';

export default {
    name: 'BlogSummary',
    components: {
        CountTo,
    },
    props: {
        summaryTableData:
        {
            type: Array,
            require: true,
            default: () => [{
                itemName1: '项目名',
                itemValue1: '项目值',
                itemName2: '项目名',
                itemValue2: '项目值',
            }]
        },

    },
    data() {
        return {

        }
    },
    mounted() {

    },

    methods: {


    }
}
</script>

<style scoped>
.word-cloud-wrapper {
    width: 100%;
    height: 400px;
    /* 必须给容器一个高度 */
    position: relative;
    overflow: hidden;
}
</style>

<style lang="scss">
@import "~/assets/scss/common/common.scss";

.blog-summary-table .el-table {
    @include background_color("bold_white_tini_tini_black_color");
    @include font_color("text-color");
}

.blog-summary-table .el-table th,
.blog-summary-table .el-table td {
    @include font_color("text-color");
    @include border_color("tini_gray_color");
    background-color: transparent !important;
}

.blog-summary-table .el-table__header-wrapper {
    @include background_color("bold_white_tini_tini_black_color");
}

.blog-summary-table .el-table__body-wrapper {
    @include background_color("bold_white_tini_tini_black_color");
}

.blog-summary-table .el-table tr {
    background-color: transparent !important;
}
</style>