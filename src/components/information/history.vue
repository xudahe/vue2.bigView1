<template>
    <div class="stadingbook fade-in-right1" style="width: 100%;height: 100%;padding: 0.1rem;">
  
      <!--   -->
      <Modal v-model="equModal" :title="equModelTitle" width="500" :mask-closable="false" draggable>
        <Form ref="stadingVal" :model="stadingVal" :label-width="100" style="margin-top: 0.2rem;" label-position="right">
          <Row>
            <Col span="24">
            <FormItem label="分组名称" prop="repairperson">
              <Input style="width: 100%;" v-model="stadingVal.title" placeholder=""> </Input>
            </FormItem>
            </Col>
          </Row>
        </Form>
  
        <div slot="footer">
          <Button type="primary" @click="saveStand">提交</Button>
          <Button type="default" @click="equModal = false">取消</Button>
        </div>
      </Modal>
  
      <!--   -->
      <Modal v-model="repariModal" :title="repariModalTitle" width="600" :mask-closable="false" draggable>
        <Form ref="repariVal" :model="repariVal" :label-width="100" style="margin-top: 0.2rem;" label-position="right">
          <Row>
            <Col span="24">
            <FormItem label="选择分组" prop="repairperson">
              <Input style="width: 100%;" v-model="repariVal.选择分组" placeholder=""> </Input>
            </FormItem>
            </Col>
            <Col span="24">
            <FormItem label="数据类型" prop="repairperson">
              <Input style="width: 100%;" v-model="repariVal.数据类型" placeholder=""> </Input>
            </FormItem>
            </Col>
            <Col span="24">
            <FormItem label="服务名称" prop="repairperson">
              <Input style="width: 100%;" v-model="repariVal.服务名称" placeholder=""> </Input>
            </FormItem>
            </Col>
            <Col span="24">
            <FormItem label="坐标系" prop="repairperson">
              <Input style="width: 100%;" v-model="repariVal.坐标系" placeholder=""> </Input>
            </FormItem>
            </Col>
            <Col span="24">
            <FormItem label="数据范围" prop="repairperson">
              <Input style="width: 100%;" v-model="repariVal.数据范围" placeholder=""> </Input>
            </FormItem>
            </Col>
            <Col span="24">
            <FormItem label="简介" prop="repairperson">
              <Input style="width: 100%;" v-model="repariVal.简介" placeholder=""> </Input>
            </FormItem>
            </Col>
            <Col span="24">
            <FormItem label="上传文件">
              <Upload :action="uploadUrlWBBefore" :on-success="uplloadSucessWBBefore" :on-remove="uplloadRemoveWBBefore"
                :data="{ foldername: 'SBWBBEFORE' }" show-upload-list multiple ref='dataFileBefore' :max-size="102400"
                :on-format-error="handleFormatErrorWBBefore" :format="['gdb']" style="width: 1.5rem;float: left;">
                <Button type="primary" icon="ios-cloud-upload-outline" @click='upFileSWBBefore(this)'>上传文件</Button>
              </Upload>
              <span style="width: 50%;float: left;color: #ff3737;">文件大小不能超过100MB</span>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="saveRepari">提交</Button>
          <Button type="default" @click="repariModal = false">取消</Button>
        </div>
      </Modal>
  
      <div class="stadingbookDiv" style="width: 100%;height: 100%;">
        <div style="width: 100%;height: 100%;">
          <div style="width: 17%;height: 100%;border-right: 1px #007AE2 solid;float: left;">
            <div style="height: calc(100% - 0rem);padding-left: 0.1rem;position: relative;">
              <div class="treeBox" style="height: 100%;margin-bottom: 0.2rem; overflow-y: auto;overflow-x: hidden;">
                <Tree :data="stadinglist" :render="renderContent" @on-select-change="getdetail" class="demo-tree-render">
                </Tree>
              </div>
            </div>
          </div>
          <div style="width: calc(83% - 1px);height: 100%;float: left;height: 100%;">
            <div class="tabpane" style="width: 100%;height: 100%;">
              <div style="width: 100%;height: 0.7rem;;">
                <div style="float: right; margin-bottom: 0.1rem;margin-top: 0.1rem;color:#fff;">
                  <span>类型：</span>
                  <Select v-model="partstype" style="width: 2.0rem;margin-right: 0.1rem;" class="select3">
                    <Option value="全部">全部</Option>
                    <Option v-for="item in partsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <span>状态：</span>
                  <Select v-model="statustype" style="width: 2.0rem;margin-right: 0.1rem;" class="select3">
                    <Option value="全部">全部</Option>
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <Button icon="md-search" type="primary" @click="searchRepairData">查询</Button>
                  <Button icon="ios-add-circle-outline" type="success" style="margin-left: 0.1rem;"
                    @click="addRepari">新增上传</Button>
                </div>
              </div>
              <Table stripe :columns="partsColumns" :data="partsData" :height="tableheight">
              </Table>
              <div class="row at-row flex-end" style="right: 0.1rem; width: 100%; text-align: right;margin-top: 0.1rem;">
                <Page show-total :current="page.currentPage" :total="page.total" :page-size="page.pageSize"
                  @on-change="pageChange" size="small">
                </Page>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { resolveComponent } from 'vue'
  import bus from "../../eventBus.js";
  import ApiSetting from "../../ApiSetting.js";
  import mapControl from '../../map/NewMapControl.vue';
  import { MapControl } from '../../map/NewMapControl.js';
  import { verif } from "../publicComponents/verification.js"

  export default {
    components: {
      mapControl
    },
    data() {
      return {
        buttonProps: {
          type: 'default',
          size: 'small',
        },
        stadinglist: [],
        tableheight: 0,
  
        //新增上传
        repariVal: {
          选择分组: "",
          数据类型: "",
          服务名称: "",
          坐标系: "",
          数据范围: "",
          简介: "",
          beforephoto: "",
        },
        uploadUrlWBBefore: '',
        fileListBefore: [],
        repariModal: false,
        repariModalTitle: "",
  
        tree_s: {
          root: null, node: null, data: null
        },
  
        //新增分组
        stadingVal: {
          title: "",
        },
        equModal: false,
        equModelTitle: '',
  
        checkstand: { id: "" }, //选中项数据源
  
        partsList: [
          {
            label: "CAD",
            value: 'CAD'
          },
        ],
        partstype: '全部',
  
        statusList: [
          {
            label: "待注册",
            value: '待注册'
          },
        ],
        statustype: '全部',
  
        page: {
          pageSize: 20,
          currentPage: 1,
          total: 0,
          datalist: [],
        },
        partsColumns: [{
          title: '编号',
          key: '编号',
          align: 'center',
        },
        {
          title: '名称',
          key: '名称',
          align: 'center',
        },
        {
          title: '类型',
          key: '类型',
          align: 'center',
        },
        {
          title: '时间',
          key: '时间',
          align: 'center',
        },
        {
          title: '服务地址',
          key: '服务地址',
          align: 'center',
        },
        {
          title: '文件大小',
          key: '文件大小',
          align: 'center',
        },
        {
          title: '状态',
          key: '状态',
          align: 'center',
        },
        {
          title: '操作',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('div', [
              h(
                'Button', {
                props: {
                  size: 'small',
                  type: 'primary',
                },
                style: {
                  fontSize: "13px"
                },
                on: {
                  click: () => {
                    this.updateRepari(params.row)
                  }
                }
              }, '注册'),
              h(
                'Button', {
                props: {
                  size: 'small',
                  type: 'error',
                },
                style: {
                  fontSize: "13px",
                  marginLeft: "5px",
                },
                on: {
                  click: () => {
                    this.deleteRepari(params.row)
                  }
                }
              }, '删除'),
            ])
          }
        }
        ],
        partsData: [],
        events: {
          handleEvent: function (event) {
            if (event.type == 'resize') {
              this.resizeHeight()
            }
          },
          resizeHeight: (e) => {
            // 逻辑代码
            let hei = document.getElementsByClassName('tabpane')[0].offsetHeight;
            this.tableheight = hei - 100;
          },
        },
  
      };
    },
    methods: {
      upFileSWBBefore() {
        this.uploadUrlWBBefore = mapconfig.webservices + 'ZJG/api/upload/image';
      },
      uplloadSucessWBBefore(response, file, fileList) {
        this.fileListBefore = [];
        for (let i = 0; i < fileList.length; i++) {
          this.fileListBefore.push(fileList[i].response)
        }
        this.$Message.success('上传成功')
      },
      uplloadRemoveWBBefore(file, fileList) {
        this.fileListBefore = [];
        for (let i = 0; i < fileList.length; i++) {
          this.fileListBefore.push(fileList[i].response)
        }
        this.$Message.success('移除成功')
      },
      handleFormatErrorWBBefore(file) {
        this.$Notice.warning({
          title: '提示',
          desc: file.name + '  文件格式错误'
        });
      },
      renderContent(h, { root, node, data }) {
  
        // 父级节点
        let parent = h("Icon", {
          props: {
            type: "ios-folder-open",
            size: "20",
          },
          style: {
            marginRight: "8px",
            color: "#2D8CF0",
          },
        });
  
        // 无子节点
        let children = h("Icon", {
          props: {
            type: "ios-list-box-outline",
            size: "20",
          },
          style: {
            marginRight: "8px",
            color: "#2DB7F5",
          },
        });
  
        if (data.title == '全部') {
          return h("span",
            {
              style: {
                display: "inline-block",
                width: "100%",
              },
            },
            [
              h("span",
                {
                  style: {
                    display: "inline-block",
                  },
                },
                [
                  // 给树节点不同的图标，有子节点跟没有子节点定义不同的图标
                  (data.children && data.children.length) > 0 ? parent : children,
                  h("span", data.title),
                ]
              ),
              h("span",
                {
                  style: {
                    display: "inline-block",
                    float: "right",
                    marginRight: "3px",
                  },
                },
                [
                  h("Icon", {
                    style: {
                      marginLeft: "10px",
                    },
                    props: {
                      type: "ios-add-circle-outline",
                      color: "#6dffb3",
                      size: "20",
                    },
                    on: {
                      click: () => {
                        console.log("当前节点", data.title);
                        this.addStand(data);
                      },
                    },
                    attrs: {
                      title: "新增",
                    },
                  }),
                ]
              ),
            ]
          );
        } else if (!data.children || data.children.length == 0) {
          return h("span",
            {
              style: {
                display: "inline-block",
                width: "100%",
              },
            },
            [
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                  },
                },
                [
                  // 给树节点不同的图标，有子节点跟没有子节点定义不同的图标
                  (data.children && data.children.length) > 0 ? parent : children,
                  h("span", data.title),
                ]
              ),
              h("span",
                {
                  style: {
                    display: "inline-block",
                    float: "right",
                    marginRight: "5px",
                  },
                },
                [
                  h("Icon", {
                    style: {
                      marginLeft: "10px",
                    },
                    props: {
                      type: "ios-create-outline",
                      color: "#64b6fb",
                      size: "20",
                    },
                    //h函数配置事件，包括自定义事件
                    on: {
                      click: () => {
                        console.log("当前节点", data.title);
                        this.updateStand(root, node, data);
                      },
                    },
                    // h函数配置原生的html属性
                    attrs: {
                      title: "修改",
                    },
                  }),
                  h("Icon", {
                    style: {
                      marginLeft: "10px",
                    },
                    props: {
                      type: "ios-trash-outline",
                      color: "#ff8d95",
                      size: "20",
                    },
                    on: {
                      click: () => {
                        console.log("当前节点", data.title);
                        if (data.title != '全部') {
                          this.deletestand(root, node, data);
                        }
                      },
                    },
                    attrs: {
                      title: "删除",
                    },
                  }),
                ]
              ),
            ]
          );
        } else {
          return h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%",
              },
            },
            [
              h("span",
                {
                  style: {
                    display: "inline-block",
                  },
                },
                [
                  // 给树节点不同的图标，有子节点跟没有子节点定义不同的图标
                  (data.children && data.children.length) > 0 ? parent : children,
                  h("span", data.title),
                ]
              ),
              h("span",
                {
                  style: {
                    display: "inline-block",
                    float: "right",
                    marginRight: "3px",
                  },
                },
                [
                  h("Icon", {
                    props: {
                      type: "ios-add-circle-outline",
                      color: "#6dffb3",
                      size: "20",
                    },
                    on: {
                      click: () => {
                        console.log("当前节点", data.title);
                        this.addStand(data);
                      },
                    },
                    attrs: {
                      title: "新增",
                    },
                  }),
                  h("Icon", {
                    style: {
                      marginLeft: "10px",
                    },
                    props: {
                      type: "ios-create-outline",
                      color: "#64b6fb",
                      size: "20",
                    },
                    //h函数配置事件，包括自定义事件
                    on: {
                      click: () => {
                        console.log("当前节点", data.title);
                        this.updateStand(root, node, data);
                      },
                    },
                    // h函数配置原生的html属性
                    attrs: {
                      title: "修改",
                    },
                  }),
                  h("Icon", {
                    style: {
                      marginLeft: "10px",
                    },
                    props: {
                      type: "ios-trash-outline",
                      color: "#ff8d95",
                      size: "20",
                    },
                    on: {
                      click: () => {
                        console.log("当前节点", data.title);
                        if (data.title != '全部') {
                          this.deletestand(root, node, data);
                        }
                      },
                    },
                    attrs: {
                      title: "删除",
                    },
                  }),
                ]
              ),
            ]
          );
        }
      },
  
      getEquipmentList() {
        let source = [
          {
            id: '1',
            title: "全部",
            expand: true,
            children: [
              {
                id: '1-1',
                title: "鼓楼",
                expand: true,
                children: [
                  {
                    id: '1-1-2',
                    title: "排水户",
                  },
                  {
                    id: '1-1-2',
                    title: "河长制",
                  },
                ],
              },
              {
                id: '1-2',
                title: "江宁",
                expand: true,
                children: [
                  {
                    id: '1-2-1',
                    title: "排水户",
                  },
                  {
                    id: '1-2-2',
                    title: "河长制",
                  },
                ],
              },
              {
                id: '1-3',
                title: "溧水",
                expand: true,
                children: [
                  {
                    id: '1-3-1',
                    title: "排水户",
                  },
                  {
                    id: '1-3-2',
                    title: "河长制",
                  },
                ],
              },
              {
                id: '1-4',
                title: "玄武",
                expand: true,
                children: [
                  {
                    id: '1-4-1',
                    title: "排水户",
                  },
                  {
                    id: '1-4-2',
                    title: "河长制",
                  },
                ],
              },
            ],
          },
        ]
  
        let bl = false;
        for (let i = 0; i < source[0].children.length; i++) {
          let item1 = source[0].children[i];
  
          for (let k = 0; k < item1.children.length; k++) {
            let item2 = item1.children[k];
  
            if (!bl) {
              item2.expand = bl = true;
              item2.selected = true;
  
              this.searchRepairData();
            }
        }
        }
  
        this.stadinglist = source;
      },
      addStand(data) {
        this.clearAddSource1();
        this.tree_s.data = data;
        this.equModal = true;
        this.equModelTitle = "新增分组"
      },
      updateStand(root, node, data) {
        this.tree_s = {
          root: root,
          node: node,
          data: data,
        };
  
        this.clearAddSource1();
        this.stadingVal.title = data.title;
        this.equModal = true;
        this.equModelTitle = "编辑分组"
      },
      saveStand() {
        if (this.equModelTitle == "新增分组") {
          const children = this.tree_s.data.children || [];
          children.push({
            title: this.stadingVal.title,
            expand: true
          });
          this.tree_s.data.children = children
          this.equModal = false;
          this.$Message.success('添加成功')
        } else {
          this.tree_s.node.node.title = this.stadingVal.title;
          this.equModal = false;
          this.$Message.success('修改成功')
        }
      },
      deletestand(root, node, data) {
        this.$Modal.confirm({
          title: '提示',
          content: '您确定要删除吗？',
          cancelText: '关闭',
          maskClosable: false,
          onOk: () => {
  
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
            this.$Message.success('删除成功')
          }
        })
      },
      clearAddSource1() {
        this.stadingVal = {
          data: {},
          title: "",
        };
      },
      clearAddSource2() {
        this.fileListBefore = [];
        this.$refs.dataFileBefore.clearFiles();
  
        this.repariVal = {
          选择分组: "",
          数据类型: "",
          服务名称: "",
          坐标系: "",
          数据范围: "",
          简介: "",
          beforephoto: "",
        };
      },
      clearRepari() {
        this.page.currentPage = 1
        this.page.total = 0
        this.page.datalist = []
        this.partsData = []
      },
  
      getTimeset(date) {
        date = new Date(date);
        var year = date.getFullYear();
        var month = Number(date.getMonth() + 1);
        var day = date.getDate();
  
        return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
      },
      pageChange(index) {
        this.page.currentPage = index
        var _start = (index - 1) * this.page.pageSize
        var _end = index * this.page.pageSize
        this.partsData = this.page.datalist.slice(_start, _end)
      },
      searchRepairData() {
        this.clearRepari();
  
        let source = [
          { 编号: "1", 名称: "GetMap", 类型: "CAD", 时间: "2022-03-09", 服务地址: "", 文件大小: "44M", 状态: "待注册" },
          {编号:"2",名称:"GetMap",类型:"CAD",时间:"2022-03-09",服务地址:"",文件大小:"44M",状态:"待注册"},
          {编号:"3",名称:"GetMap",类型:"CAD",时间:"2022-03-09",服务地址:"",文件大小:"44M",状态:"待注册"},
          {编号:"4",名称:"GetMap",类型:"CAD",时间:"2022-03-09",服务地址:"",文件大小:"44M",状态:"待注册"},
          {编号:"5",名称:"GetMap",类型:"CAD",时间:"2022-03-09",服务地址:"",文件大小:"44M",状态:"待注册"},
  
        ]
        this.page.datalist = source;
        this.page.total = source.length;
        this.pageChange(1);
      },
      addRepari() {
        this.clearAddSource2()
        this.repariModal = true;
        this.repariModalTitle = "新增上传";
        this.$refs.dataFileBefore.clearFiles();
      },
      updateRepari(row) {
  
      },
      saveRepari() {
        let fileurlBefore = this.fileListBefore.length > 0 ? this.fileListBefore.join('|') : "";
  
      },
      deleteRepari(row) {
        this.$Modal.confirm({
          title: '提示',
          content: '您确定要删除吗？',
          cancelText: '关闭',
          maskClosable: false,
          onOk: () => {
  
          }
        })
      },
      getdetail(list, val) {
        // 选取最后一层
        if (!val.children) {
          this.checkstand = val;
          console.log(val)
          this.searchRepairData();
        }
      },
    },
    mounted() {
      this.getEquipmentList();
  
      let hei = document.getElementsByClassName('tabpane')[0].offsetHeight;
      this.tableheight = hei - 100;
      window.addEventListener('resize', this.events, false);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.events, false);
    },
  };
  </script>
  
  <style lang="less">
  .stadingbook {
    .ivu-tree-empty {
      text-align: center;
      color: #3899c7;
      margin-top: 0.3rem;
    }
  
    .ivu-upload-list-file {
      color: rgb(98, 175, 246) !important;
    }
  
    .ivu-upload-list-file>span i {
      color: rgb(98, 175, 246) !important;
    }
  
    .ivu-tree-title {
      width: 90% !important;
    }
  
    .ivu-tree-title-selected {
      background-color: #165776 !important;
    }
  
    .ivu-tree-title:hover {
      background-color: #165776 !important;
    }
  
    .ivu-tree ul {
      font-size: 0.16rem !important;
    }
  
    .ivu-table table {
      font-size: 0.16rem !important;
    }
  
  }
  </style>
  