angular
	.module("gantt",[])
	.controller
	(
		"planner",
		function($scope, $timeout)
		{
			var dayDiff = 0;
			var dayDiff0 = 0;
			var dayDiff1 = 0;
			var dayDiff2 = 0;

			function getTaskStuff(task, level, parent)
			{
				return{
					name : task.name,
					start : task.start,
					startMoment : task.start,
					end : task.end,
					endMoment : task.end,
					dragStart : task.start,
					dragStartMoment : task.star,
					currentDragStartMoment : task.start,
					dragEnd : task.end,
					dragEndMoment : task.end,
					currentDragEndMoment : task.end,
					progress : task.progress,
					level : level,
					movable : level == 4,
					expanded : true,
					parent : parent,
					selectable : task.selectable
				};
			};

			function getNumberStuff(number)
			{
				var numberStuff=
				{
					unit : number % 10,
					ten : ((number / 10) | 0) * 10,
					hundred : ((number / 100) | 0) * 100
				};

				return numberStuff;
			};

			function newTenData(tenData)
			{
				return {
					id : tenData.id,
					name : /*"S" +*/ weekData.week,
					units : 1
				};
			};

			function newHundredData(numberStuff)
			{
				return {
					id : numberStuff.hundred + "_" + dayStuff.ten,
					index : numberStuff.month,
					days : 1
				};
			};

			function init()
			{
				var i;
				var j;
				var k;
				var l;
				var batches;
				var subBatches;
				var concepts;
				var estimatedConcepts;
				var start;
				var yearStart;
				var yearDay;
				var day;
				var end;
				var tenData;
				var hundredData;
				var monthDay;
				var dayStuff;
				var yearIndex = -1;
				var root = null;
				var root0 = null;
				var root1 = null;
				var root2 = null;
				var taskIndex = -1;


				$scope.units = [];
				$scope.tens = {};
				$scope.hundreds = {};
				$scope.years = [];
				$scope.yearDays = [];
				$scope.tasks = [];
				$scope.mouseDown = false;
				$scope.keys = Object.keys;
				$scope.selectedTask = null;
				$scope.selectedDay = null;

				$scope.taskClass=
				[
					"",
					"task",
					"taskSelected"
				];

				$scope.unitDay=
				[
					"0",
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7",
					"8",
					"9",
				];

				$scope.tenName=
				[
					"000",
					"010",
					"020",
					"030",
					"040",
					"050",
					"060",
					"070",
					"080",
					"090",
					"100",
					"110",
					"120",
					"130",
					"140",
					"150",
					"160",
					"170",
					"180",
					"190",
					"200",
					"210",
					"220",
					"230",
					"240",
					"250",
					"260",
					"270",
					"280",
					"290",
					"300",
					"310",
					"320",
					"330",
					"340",
					"350",
					"360",
					"370",
					"380",
					"390",
					"400",
					"410",
					"420",
					"430",
					"440",
					"450",
					"460",
					"470",
					"480",
					"490",
					"500",
					"510",
					"520",
					"530",
					"540",
					"550",
					"560",
					"570",
					"580",
					"590",
					"600",
					"610",
					"620",
					"630",
					"640",
					"650",
					"660",
					"670",
					"680",
					"690",
				];

				var tree=
				[
					{
						name : "Project",
						start : 20,
						end : 12,
						progress : 176,
						movable : false
					},
					{
						name : "Batch",
						start : 13,
						end : 95,
						progress : 15,
						parts:
						[
							{
								name : "Sub Batch",
								start : 14,
								end : 86,
								progress : 23,
								parts:
								[
									{
										name : "Concept",
										start : 15,
										end : 74,
										progress : 80,
										parts:
										[
											{
												name : "Estimated Concept 0",
												start : 23,
												end : 69,
												progress : 15,
												selectable : true
											},
											{
												name : "Estimated Concept 1",
												start : 17,
												end : 35,
												progress : 37,
												selectable : true
											}
										]
									}
								]
							}
						]
					}
				];

				for(i = 0, batches = tree.length; i < batches; i++)
				{
					if(i > 0)
					{
						root = 0;
					}

					$scope.tasks.push(getTaskStuff(tree[i], 1, root));
					taskIndex++;

					if(tree[i].parts)
					{
						root0 = taskIndex;

						for(j = 0, subBatches = tree[i].parts.length; j < subBatches; j++)
						{
							$scope.tasks.push(getTaskStuff(tree[i].parts[j], 2, root0));
							taskIndex++;

							if(tree[i].parts[j].parts)
							{
								root1 = taskIndex;

								for(k = 0, concepts = tree[i].parts[j].parts.length; k < concepts; k++)
								{
									$scope.tasks.push(getTaskStuff(tree[i].parts[j].parts[k], 3, root1));
									taskIndex++;

									if(tree[i].parts[j].parts[k].parts)
									{
										root2 = taskIndex;

										for(l = 0, estimatedConcepts = tree[i].parts[j].parts[k].parts.length; l < estimatedConcepts; l++)
										{
											$scope.tasks.push(getTaskStuff(tree[i].parts[j].parts[k].parts[l], 4, root2));
											taskIndex++;
										}
									}
								}
							}
						}
					}
				}

				$scope.tasks[0].level = 0;

				start = $scope.tasks[0].start;
				day = start;
				end = $scope.tasks[0].end;

				numberStuff = getNumberStuff(number);
				$scope.numbers.push(numberStuff);

				while(number != end)
				{
					day.setDate(day.getDate() + 1);
					weekDay = day.getDay();
					monthDay = day.getDate();
					dayStuff = getDayStuff(day, weekDay);

					if(weekDay != 1)
					{
						$scope.weeks[weekData.id].days++;
					}
					else
					{
						weekData = yearWeek(day);
						$scope.weeks[weekData.id] = newWeekData(weekData);
					}

					if(monthDay != 1)
					{
						$scope.months[monthData.id].days++;
					}
					else
					{
						monthData = newMonthData(dayStuff);
						$scope.months[monthData.id] = monthData;
					}

					if(dayStuff.year == $scope.years[yearIndex])
					{
						$scope.yearDays[yearIndex]++;
						yearDay++;
					}
					else
					{
						$scope.years.push(dayStuff.year);
						yearIndex++;
						$scope.yearDays[yearIndex] = 1;
						yearDay = 1;
					}

					dayStuff.yearDay = yearDay;

					$scope.days.push(dayStuff);
				}
			};

			$scope.toggle = function(index)
			{
				$scope.tasks[index].expanded = !$scope.tasks[index].expanded;
			};

			$scope.selectTask = function(index, day)
			{
				$scope.selectedTask = index;
				$scope.selectedDay = day;
			};

			$scope.unselectTask = function()
			{
				if($scope.selectedTask)
				{
					$scope.tasks[$scope.selectedTask].currentDragStartMoment= $scope.tasks[$scope.selectedTask].dragStartMoment;
					$scope.tasks[$scope.selectedTask].currentDragEndMoment = $scope.tasks[$scope.selectedTask].dragEndMoment;

					$scope.selectedTask = null;
					$scope.selectedDay = null;
				}
			};

			$scope.updateTaskInteractiveState =  function(taskIndex, day)
			{
				if(!$scope.mouseDown)
				{
					if($scope.selectedTask)
					{
						//console.log($scope.selectedTask,"unselected");
						$scope.tasks[$scope.selectedTask].currentDragStartMoment = $scope.tasks[$scope.selectedTask].dragStartMoment;
						$scope.tasks[$scope.selectedTask].currentDragEndMoment = $scope.tasks[$scope.selectedTask].dragEndMoment;

						$scope.selectedTask = null;
						$scope.selectedDay = null;
					}
				}
				else
				{
					if($scope.selectedTask)
					{
						dayDiff0 = dayDiff * -1;
						dayDiff = Math.ceil(($scope.selectedDay.dateData.getTime() - day.dateData.getTime()) / 86400000);
						dayDiff1 = Math.abs(dayDiff);
						dayDiff2 = Math.abs(dayDiff0);

						var newStart;
						var newEnd;

						if(dayDiff > 0)
						{
							newStart = moment($scope.tasks[$scope.selectedTask].currentDragStartMoment.subtract(dayDiff1, "days").format("YYYY-MM-DD"), "YYYY-MM-DD");
							newEnd = moment($scope.tasks[$scope.selectedTask].currentDragEndMoment.subtract(dayDiff1, "days").format("YYYY-MM-DD"), "YYYY-MM-DD");
						}
						else
						{
							if(dayDiff == 0)
							{
								if(dayDiff0 > 0)
								{
									newStart = moment($scope.tasks[$scope.selectedTask].dragStartMoment.subtract(dayDiff2, "days").format("YYYY-MM-DD"), "YYYY-MM-DD");
									newEnd = moment($scope.tasks[$scope.selectedTask].dragEndMoment.subtract(dayDiff2, "days").format("YYYY-MM-DD"), "YYYY-MM-DD");
								}
								else
								{
									newStart = moment($scope.tasks[$scope.selectedTask].dragStartMoment.add(dayDiff2, "days").format("YYYY-MM-DD"), "YYYY-MM-DD");
									newEnd = moment($scope.tasks[$scope.selectedTask].dragEndMoment.add(dayDiff2, "days").format("YYYY-MM-DD"), "YYYY-MM-DD");
								}
							}
							else
							{
								newStart = moment($scope.tasks[$scope.selectedTask].currentDragStartMoment.add(dayDiff1, "days").format("YYYY-MM-DD"), "YYYY-MM-DD");
								newEnd = moment($scope.tasks[$scope.selectedTask].currentDragEndMoment.add(dayDiff1, "days").format("YYYY-MM-DD"), "YYYY-MM-DD");
							}
						}

						$scope.tasks[$scope.selectedTask].dragStartDate = moment(newStart.format("YYYY-MM-DD"), "YYYY-MM-DD");
						$scope.tasks[$scope.selectedTask].dragEndDate = moment(newEnd.format("YYYY-MM-DD"), "YYYY-MM-DD");

						$scope.tasks[$scope.selectedTask].dragStart = $scope.tasks[$scope.selectedTask].dragStartDate.format("YYYY-MM-DD");
						$scope.tasks[$scope.selectedTask].dragEnd = $scope.tasks[$scope.selectedTask].dragEndDate.format("YYYY-MM-DD");
					}
				}
			};

			$scope.taskDisplayed = function(task)
			{
				return task.parent == null
						||
					(
						(
							(task.level == 1 && $scope.tasks[0].expanded)
								||
							(
								task.level == 2
									&&
								(
									$scope.tasks[0].expanded
										&&
									(
										$scope.tasks[task.parent].expanded
										&& $scope.tasks[$scope.tasks[task.parent].parent].expanded
									)
								)
							)
						)
							||
						(
							(
								task.level == 3
									&&
								(
									$scope.tasks[0].expanded
										&&
									(
										$scope.tasks[task.parent].expanded
											&&
										(
											$scope.tasks[$scope.tasks[task.parent].parent].expanded
											&& $scope.tasks[$scope.tasks[$scope.tasks[task.parent].parent].parent].expanded
										)
									)
								)
							)
								||
							(
								task.level == 4
									&&
								(
									$scope.tasks[0].expanded
										&&
									(
										$scope.tasks[task.parent].expanded
											&&
										(
											$scope.tasks[$scope.tasks[task.parent].parent].expanded
												&&
											(
												$scope.tasks[$scope.tasks[$scope.tasks[task.parent].parent].parent].expanded
												&& $scope.tasks[$scope.tasks[$scope.tasks[$scope.tasks[task.parent].parent].parent].parent].expanded
											)
										)
									)
								)
							)
						)
					);
			};

			document.body.onmouseup = function()
			{
				$scope.mouseDown = false;
			};

			document.body.onmousedown = function()
			{
				$scope.mouseDown = true;
			};

			init();
		}
	);