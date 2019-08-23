/**
 * @module views\basicData\enterpriseBasicInformation\organizationalStructure
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class OrganizationalStructure extends Vue {
  private id = 1000;
  private data5 = [];
  private data = [
    {
      id: 1,
      label: "成都圣恩生物科技股份有限公司",
      children: [
        {
          id: 2,
          label: "总经办",
          children: [
            {
              id: 3,
              label: "销售部"
            },
            {
              id: 4,
              label: "市场部"
            },
            {
              id: 5,
              label: "市场部"
            },
            {
              id: 6,
              label: "市场部"
            },
            {
              id: 7,
              label: "市场部"
            },
            {
              id: 8,
              label: "市场部"
            },
            {
              id: 9,
              label: "市场部"
            },
            {
              id: 10,
              label: "市场部"
            },
            {
              id: 11,
              label: "市场部"
            }
          ]
        }
      ]
    }
  ];

  mounted() {
    this.data5 = JSON.parse(JSON.stringify(this.data));
    console.log(this.data5);
  }

  private append(data) {
    const newChild = { id: this.id++, label: "testtest", children: [] };
    if (!data.children) {
      this.$set(data, "children", []);
    }
    data.children.push(newChild);
  }

  private remove(node, data) {
    const parent = node.parent;
    const children = parent.data.children || parent.data;
    const index = children.findIndex(d => d.id === data.id);
    children.splice(index, 1);
  }

  //   private renderContent(h, { node, data, store }) {
  //     return (
  //       '<span class="custom-tree-node">
  //         <span>{node.label}</span>
  //         <span>
  //           <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
  //           <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
  //         </span>
  //       </span>');
  //   }
}
