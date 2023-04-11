import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'

interface TaskAttributes {
  name: string;
  statement: string;
  deadline: Date;
  correctSolution: string;
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
  name!: string;
  statement!: string;
  deadline!: Date;
  correctSolution!: string;
}

Task.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  statement: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  correctSolution: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true,
  underscored: true,
  sequelize: sequelizeConnection
})

export default Task;
