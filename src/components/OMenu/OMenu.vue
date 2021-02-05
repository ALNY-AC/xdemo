<template>
    <el-menu router class="o-menu" background-color="#fff" text-color="#333">
        <el-menu-item index="/" :route="{path:'/'}">首页</el-menu-item>

        <el-submenu index="shop">
            <template slot="title">
                <span>商城系统</span>
            </template>
            <el-menu-item index="/shop" :route="{path:'/shop'}">首页</el-menu-item>
            <el-submenu index="goods">
                <template slot="title">
                    <span>商品管理</span>
                </template>
                <el-menu-item index="/shop/prop/edit" :route="{path:'/shop/prop/edit'}">商品属性配置</el-menu-item>
                <el-menu-item index="/shop/goods/edit" :route="{path:'/shop/goods/edit'}">新增商品</el-menu-item>
                <el-menu-item index="/shop/goods/list" :route="{path:'/shop/goods/list'}">商品列表</el-menu-item>
            </el-submenu>
        </el-submenu>

        <el-submenu index="activity">
            <template slot="title">
                <span>抽奖</span>
            </template>
            <el-menu-item index="/activity/luck" :route="{path:'/activity/luck'}">转盘配置</el-menu-item>
            <el-menu-item index="/activity/prizedraw" :route="{path:'/activity/prizedraw'}">抽奖页面</el-menu-item>
            <el-menu-item index="/shop" :route="{path:'/shop'}">得奖名单</el-menu-item>
        </el-submenu>

        <el-submenu index="canvas">
            <template slot="title">
                <span>绘图</span>
            </template>
            <el-menu-item index="/canvas/luck" :route="{path:'/canvas/konva'}">konva</el-menu-item>
            <el-menu-item index="/canvas/luck" :route="{path:'/canvas/fabric'}">fabric</el-menu-item>
        </el-submenu>

        <el-submenu index="demo">
            <template slot="title">
                <span>demo</span>
            </template>
            <el-menu-item index="/demo/table" :route="{path:'/demo/table'}">table</el-menu-item>
            <el-menu-item index="/treeTable" :route="{path:'/treeTable'}">treeTable</el-menu-item>
            <el-menu-item index="/demo/goods/edit" :route="{path:'/demo/goods/edit'}">Goods Edit</el-menu-item>
        </el-submenu>

        <el-submenu index="echarts">
            <template slot="title">
                <span>地图</span>
            </template>
            <el-menu-item index="/echarts/map" :route="{path:'/echarts/map'}">map</el-menu-item>
        </el-submenu>

        <el-submenu index="draggable">
            <template slot="title">
                <span>draggable</span>
            </template>
            <el-menu-item
                index="/demo/draggable/drag"
                :route="{path:'/demo/draggable/drag'}"
            >可视化demo</el-menu-item>
        </el-submenu>

        <el-submenu index="gui">
            <template slot="title">
                <span>gui</span>
            </template>
            <el-menu-item index="/gui/cube" :route="{path:'/gui/cube'}">cube</el-menu-item>
            <el-menu-item index="/gui/form" :route="{path:'/gui/form'}">form</el-menu-item>
            <el-menu-item index="/gui/oa/node" :route="{path:'/gui/oa/node'}">oa node</el-menu-item>
        </el-submenu>

        <el-submenu index="paper">
            <template slot="title">
                <span>paper</span>
            </template>
            <el-menu-item index="/paper" :route="{path:'/paper'}">paper</el-menu-item>
            <el-menu-item index="/paper/studio" :route="{path:'/paper/studio'}">studio</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script src="./OMenu.js"></script>
<style lang="scss" scoped>
@import "OMenu.scss";
</style>