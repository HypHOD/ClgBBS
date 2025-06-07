import { defineStore } from 'pinia'
import axios from 'axios'

// 定义帖子类型
export type Post = {
    id: number | null,
    section: string | null,
    userId: number | null,
    createTime: string,
    updateTime: string,
    title: string,
    like_num: number,
    isDelete: number,
    content: string,
}

const ins = axios.create({
    baseURL: 'http://localhost:8080',// 基地址
    timeout: 1000,
})

export const usePostDepositoryStore = defineStore('postDepository', {
    state: () => ({
        showMode: 'list',
        searchText: '',
        posts: [] as Post[],
        selectedPost: null as Post | null,
    }),

    getters: {
        // 获取未删除的帖子
        activePosts: (state) => state.posts.filter(post => post.isDelete === 0),

        // 根据搜索文本过滤帖子
        filteredPosts: (state) => {
            if (!state.searchText) return state.activePosts
            return state.activePosts.filter(post =>
                post.title.toLowerCase().includes(state.searchText.toLowerCase()) ||
                post.content.toLowerCase().includes(state.searchText.toLowerCase())
            )
        }
    },

    actions: {
        // 添加新帖子
        addPost(post: Post) {
            this.posts.push(post)
            async () => {
                await ins.post('/api/post', post);
            }
        },

        async loadPosts() {
            const res = await ins.get('/post/search'{
                params: {
                    pageNum: 1,
                    pageSize: 10,
                }
            })
        }

        // 根据ID获取帖子
        async getPostById(id: number): Post | undefined {
             const res = await ins.get('/post/search'{
                params: {
                        pageNum: 1,
                        pageSize: 10,
                        name: 'test',

                }
            })
            return res.data.data
        },

        // 更新帖子
        updatePost(updatedPost: Post) {
            const index = this.posts.findIndex(post => post.id === updatedPost.id)
            if (index !== -1) {
                this.posts[index] = updatedPost
            }
        },

        // 删除帖子（软删除）
        deletePost(id: number) {
            const post = this.getPostById(id)
            if (post) {
                post.isDelete = 1
            }
        },

        // 设置显示模式
        setShowMode(mode: 'list' | 'grid') {
            this.showMode = mode
        },

        // 设置搜索文本
        setSearchText(text: string) {
            this.searchText = text
        }
    }
})