<template>
  <div id="app">
      <textarea class="latex-textarea" v-model="latex"></textarea>
      <div class="row">
          <label>解析：</label>
          <div v-katex="latex"></div>
      </div>
      <div class="row">
          <!-- <label>解析：</label> -->
          <!-- <p v-katex="latex3"></p>
          <p v-katex="latex4"></p> -->
      </div>
  </div>
</template>

<script>
// import renderMathInElement from 'katex/dist/contrib/auto-render'
export default {
    name: 'App',
    data () {
        return {
            show:false,
            latex:String.raw `先化简，$$1 $$再求值：$\frac{a}{a-b}\left( \frac{1}{b}-\frac{1}{a} \right)+\frac{a-1}{b}$，其中$$a=2$$，<left>b=\frac{1}{3}<right>．  <br>`,
            latex1:String.raw `$$\displaystyle \frac{1}{\Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{\frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {1+\frac{e^{-6\pi}} {1+\frac{e^{-8\pi}} {1+\cdots} } } }a$$`,
            latex3:String.raw `\$$$1$$`,
            latex4:String.raw `$$\ce{C6H5-CHO}$$`,
            latex5:String.raw `$$\tag{3.1c} a^2+b^2=c^2$$`,
        }
    },
    mounted () {
        this.$nextTick(()=>{
            // renderMathInElement(document.body, {
                
            // });
        })
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.latex-textarea{
    width: 600px;
    height: 300px;
    display: block;
    margin: 0 auto;
}
.row{
    padding-top: 20px;
    display: flex;
    width: 600px;
    margin: 0 auto;
    line-height: 40px;
}
.row label{
    width: 80px;
}
</style>