const app = Vue.createApp({
    data:() => ({
        title: "Generate Gradient",
        color1: "#92A215",
        color2: "#BA1212",
        orientation: 1,
    }),
    computed:
    {
        setColor(){
            var movimiento;
            if (this.orientation == 1) movimiento = `to right`;
            else if(this.orientation == 2) movimiento = `to left`;
            else if(this.orientation == 3) movimiento = `to top`;
            else{
                movimiento = `to bottom`;
            } 
            return `background: linear-gradient(${movimiento}, ${this.color1}, ${this.color2});`;
        }, 
    }
});