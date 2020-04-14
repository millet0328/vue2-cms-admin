<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>购物车</span>
		</div>
		<el-table :data="cart" style="width: 100%">
			<el-table-column label="#" prop="id" width="60">
			</el-table-column>
			<el-table-column align="center" label="商品名称" prop="name">
			</el-table-column>
			<el-table-column align="center" label="数量" width="180">
				<template slot-scope="scope">
					<el-input v-model="scope.row.number">
						<el-button slot="prepend">-</el-button>
						<el-button slot="append">+</el-button>
					</el-input>
				</template>
			</el-table-column>
			<el-table-column align="center" label="单价" prop="price">
			</el-table-column>
			<el-table-column align="center" label="小计">
				<template slot-scope="scope">
					{{money(scope.row)}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div>
			总共{{totalNumber}}个商品，总计花费{{totalMoney}}元
		</div>
	</el-card>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex';
	let { mapState, mapGetters } = createNamespacedHelpers('Cart');

	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['cart']),
			...mapGetters(['totalNumber', 'totalMoney', 'money']),
		},
		methods: {
			handleDelete(index, row) {
				console.log(index, row);
			}
		}
	}
</script>

<style>
</style>
