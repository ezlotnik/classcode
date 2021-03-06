console.log("HELLO");

var V1View = Backbone.View.extend({
		el:"#v1",
		template: _.template($("#v1_template").html()),
		initialize:function(){
				var that = this;
				this.model.on("change",function(){
						that.render();
				});
				this.render();
		},
		render: function(){
				var e = this.template(this.model.toJSON());
				this.$el.empty();
				this.$el.append(e);
				return this;
		}


});


var V2View = Backbone.View.extend({
		el:"#v2",
		template: _.template($("#v2_template").html()),
		events: {
				"click #up" : function(e) {
						var r = this.model.get("rating");
						r = parseInt(r);
						r = r + 1;
						this.model.set('rating',r);
						this.render();
				},
				"click #down" : function(e) {
						var r = this.model.get("rating");
						r = parseInt(r);
						r = r - 1;
						this.model.set('rating',r);
						this.render();
				},
				"click .change" : function(e){
						var r = $(".t").val();
						console.log(r);
						this.model.set('review',r);
				},
		},
		initialize:function(){
				var that = this;
				this.model.on("change",function(){
						that.render();
				});
				this.render();
		},
		render: function(){
				var e = this.template(this.model.toJSON());
				this.$el.empty();
				this.$el.append(e);
				return this;
		}


});


var Place = Backbone.Model.extend({
		defaults:{'name':'name goes here',
							'rating':0,
							'review':''},
		validate:function(attrs,options){
				if (isNaN(attrs.rating)){
						return "Rating must be numeric";
				}
		}
});

var p1 = new Place({name:"Terry's", rating:5});
var v1 = new V1View({model:p1});
var v2 = new V2View({model:p1});
