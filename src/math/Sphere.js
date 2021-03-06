
// File:src/math/Sphere.js

/**
 * @author bhouston / http://exocortex.com
 * @author mrdoob / http://mrdoob.com/
 */
/*
///Sphere对象的构造函数.用来在三维空间内创建一个球体对象.Sphere对象的功能函数采用
///定义构造的函数原型对象来实现.
///
///	用法: var center = new Vector3(0,0,0),radius = 5; var sphere = new Sphere(center,radius);
///创建一个圆心是0,0,0半径是5的球体.
*/
///<summary>Sphere</summary>
///<param name ="center" type="Vector3">中心点坐标值</param>
///<param name ="radius" type="Number">Number球体半径</param>
THREE.Sphere = function ( center, radius ) {

	this.center = ( center !== undefined ) ? center : new THREE.Vector3();	//赋值或者初始化center
	this.radius = ( radius !== undefined ) ? radius : 0;	//赋值或者初始化radius

};

/****************************************
****下面是Sphere对象提供的功能函数.
****************************************/
THREE.Sphere.prototype = {

	constructor: THREE.Sphere,	//构造器,返回对创建此对象的Sphere函数的引用

	/*
	///set方法用来重新设置球体的中心点坐标值,球体半径,center,radius坐标值.并返回新半径,坐标值的球体.
	*/
	///<summary>set</summary>
	///<param name ="center" type="Vector3">中心点坐标值</param>
	///<param name ="radius" type="Number">Number球体半径</param>
	///<returns type="Sphere">返回新半径,坐标值的球体</returns>
	set: function ( center, radius ) {

		this.center.copy( center );
		this.radius = radius;

		return this;		//返回新半径,坐标值的球体
	},

	/*
	///setFromPoints方法通过获得Vector3对象组成的points数组中的到圆心距离最大的值重新设置球体的半径,通过可选参数optionalCenter用来设置球体的圆心.并返回新半径,坐标值的球体.
	/// NOTE:注意如果给setFromPoints()方法设置了optionalCenter参数,points数组中数值到圆心的距离将会改变.
	*/
	///<summary>setFromPoints</summary>
	///<param name ="points" type="Vector3Array">Vector3对象组成的points数组</param>
	///<param name ="optionalCenter" type="Vector3">可选参数,接收返回结果,球体的中心点</param>
	///<returns type="Sphere">返回新半径,坐标值的球体</returns>
	setFromPoints: function () {

		var box = new THREE.Box3();

		return function ( points, optionalCenter )  {

			var center = this.center;

			if ( optionalCenter !== undefined ) {

				center.copy( optionalCenter );

			} else {

				box.setFromPoints( points ).center( center );

			}

			var maxRadiusSq = 0;

			for ( var i = 0, il = points.length; i < il; i ++ ) {

				maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );	//求points数组中到圆心的最大值并赋值给maxRadiusSq

			}

			this.radius = Math.sqrt( maxRadiusSq );	

			return this;	//返回新半径,坐标值的球体

 		};

	}(),

	/*
	///copy方法用来复制球体的圆心,半径,center,radius值.返回新半径,坐标值的球体
	*/
	///<summary>copy</summary>
	///<param name ="sphere" type="Sphere">球体</param>
	///<returns type="Sphere">返回新半径,坐标值的球体</returns>
	copy: function ( sphere ) {

		this.center.copy( sphere.center );
		this.radius = sphere.radius;

		return this;	//返回新半径,坐标值的球体

	},

	/*
	///empty方法用来判断球体的半径是否小于等于0,用来判断空间中半径是0,或者小于0的球体.
	*/
	///<summary>empty</summary>
	///<returns type="Boolean">返回true 或者 false</returns>
	empty: function () {

		return ( this.radius <= 0 );	//返回true 或者 false

	},

	/*
	///containsPoint方法用来获得参数point(一个Vector3的三维点坐标)是否在当前球体内.
	*/
	///<summary>containsPoint</summary>
	///<param name ="point" type="Vector3">一个Vector3的三维点坐标</param>
	///<returns type="Boolean">返回true 或者 false</returns>
	containsPoint: function ( point ) {

		return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );	//返回true 或者 false

	},

	/*
	///distanceToPoint方法用来获得三维空间内一点到Sphere球体对象表面的最小长度.
	*/
	///<summary>distanceToPoint</summary>
	///<param name ="point" type="Vector3">一个三维空间内的Vector3的三维点坐标</param>
	///<returns type="Number">返回三维空间内一点到Sphere球体对象表面的最小长度.</returns>
	distanceToPoint: function ( point ) {

		return ( point.distanceTo( this.center ) - this.radius );	//返回三维空间内一点到Sphere球体对象表面的最小长度.

	},

	/*
	///intersectsSphere方法获取当前球体是否与参数sphere球体对象相交,返回true 或者 false
	*/
	///<summary>intersectsSphere</summary>
	///<param name ="sphere" type="Sphere">一个Sphere的球体</param>
	///<returns type="Boolean">返回true 或者 false</returns>
	intersectsSphere: function ( sphere ) {

		var radiusSum = this.radius + sphere.radius;

		return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );	//返回true 或者 false

	},

	/*
	///clampPoint方法用来通过参数point收缩球体.如果point在球体外,强制将point设置到球体表面,如果point在球体内,重新设置球体半径为point到当前球体半径的距离.
	*/
	///<summary>clampPoint</summary>
	///<param name ="point" type="Vector3">一个Vector3的三维点坐标</param>
	///<param name ="optionalTarget" type="Vector3">可选参数,接收返回结果,返回剪裁过的边界点</param>
	///<returns type="Vector3">返回剪裁过的边界点.</returns>
	clampPoint: function ( point, optionalTarget ) {

		var deltaLengthSq = this.center.distanceToSquared( point );

		var result = optionalTarget || new THREE.Vector3();
		result.copy( point );

		if ( deltaLengthSq > ( this.radius * this.radius ) ) {

			result.sub( this.center ).normalize();
			result.multiplyScalar( this.radius ).add( this.center );

		}

		return result;	// 返回剪裁过的边界点

	},

	/*
	///getBoundingBox方法返回当前球体的Box3立方体边界(这里应该外切于球体的一个立方体)
	/// 与Box3类中的getBoundingSphere()方法对应.
	*/
	///<summary>getBoundingBox</summary>
	///<param name ="optionalTarget" type="THREE.Box3()">可选参数,THREE.Box3()立方体对象,用来接收返回值</param>
	///<returns type="THREE.Sphere()">返回当前球体的Box3立方体边界(这里应该外切于球体的一个立方体)</returns>
	getBoundingBox: function ( optionalTarget ) {

		var box = optionalTarget || new THREE.Box3();

		box.set( this.center, this.center );
		box.expandByScalar( this.radius );

		return box;			//返回当前球体的Box3立方体边界(这里应该外切于球体的一个立方体)

	},

	/*
	///applyMatrix4方法通过传递matrix(旋转,缩放,移动等变换矩阵)对当前Sphere球体对象的圆心和半径,应用变换.
	*/
	///<summary>applyMatrix4</summary>
	///<param name ="matrix" type="Matrix4">(旋转,缩放,移动等变换矩阵</param>
	///<returns type="Boolean">返回变换后的球体.</returns>
	applyMatrix4: function ( matrix ) {

		this.center.applyMatrix4( matrix );
		this.radius = this.radius * matrix.getMaxScaleOnAxis();

		return this;		//返回变换后的球体.

	},

	/*
	///translate方法用来通过参数offset,移动当前球体的位置.
	*/
	///<summary>translate</summary>
	///<param name ="offset" type="Vector3">偏移量</param>
	///<returns type="Boolean">返回新半径,坐标值的球体</returns>
	translate: function ( offset ) {

		this.center.add( offset );

		return this;	//返回新半径,坐标值的球体

	},

	/*
	///equals方法用来获得参数sphere(一个Sphere的球体)是否与当前球体完全相等,即圆心和半径相等.
	*/
	///<summary>equals</summary>
	///<param name ="sphere" type="Sphere">一个Sphere的球体</param>
	///<returns type="Boolean">返回true 或者 false</returns>
	equals: function ( sphere ) {

		return sphere.center.equals( this.center ) && ( sphere.radius === this.radius );	//返回true 或者 false

	},

	/*clone方法
	///clone方法克隆一个球体对象.
	*/
	///<summary>clone</summary>
	///<returns type="Sphere">返回球体对象</returns>	
	clone: function () {

		return new THREE.Sphere().copy( this );		//返回球体对象

	}

};
