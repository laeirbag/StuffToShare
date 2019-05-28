angular
	.module("gantt",[])
	.controller
	(
		"planner",
		function($scope, $timeout)
		{
			$scope.formatDate =  function(date)
			{
				return JSON.stringify(date).replace("\"", "").split("T")[0];
			};

			function yearWeek(dateData)
			{
				var date;
				var year;
				var nDay;
				var n1stThursday;
				var week;

				date = new Date(dateData.valueOf());
				year = date.getFullYear();

					// ISO week date weeks start on Monday, so correct the day number
				nDay = (date.getDay() + 6) % 7;

					// ISO 8601 states that week 1 is the week with the first Thursday of that year
					// Set the target date to the Thursday in the target week
				date.setDate(date.getDate() - nDay + 3);

					// Store the millisecond value of the target date
				n1stThursday = date.valueOf();

					// Set the target to the first Thursday of the year
					// First, set the target to January 1st
				date.setMonth(0, 1);

					// Not a Thursday? Correct the date to the next Thursday
				if (date.getDay() !== 4)
				{
					date.setMonth(0, 1 + ((4 - date.getDay()) + 7) % 7);
				}

					// The week number is the number of weeks between the first Thursday of the year
					// and the Thursday in the target week (604800000 = 7 * 24 * 3600 * 1000)

				week = 1 + Math.ceil((n1stThursday - date) / 604800000);

				if(week < 10)
				{
					week = "0" + week;
				}

				//return year + " #" + week;
				return{
					id : year + "#" + week,
					year : year,
					week : week
				};
			};

			function getTaskStuff(task, level, parent)
			{
				return{
					name : task.name,
					start : task.start,
					startDate : new Date(task.start),
					end : task.end,
					endDate : new Date(task.end),
					dragStart : task.start,
					dragStartDate : new Date(task.start),
					currentDragStartDate : new Date(task.start),
					dragEnd : task.end,
					dragEndDate : new Date(task.end),
					currentDragEndDate : new Date(task.end),
					progress : task.progress,
					level : level,
					movable : level == 4,
					expanded : true,
					parent : parent,
					selectable : task.selectable
				};
			};

			function getDayStuff(day, weekDay, yearDay)
			{
				var monthStuff = day.getMonth() + 1;
				var code = $scope.formatDate(day);
				var splitCode = code.split("-");

				var dayStuff=
				{
					date : new Date(day),
					code : code,
					day : day.getDate(),
					dayCode : splitCode[2],
					month : day.getMonth(),
					monthCode : splitCode[1],
					year : splitCode[0],
					weekDay : weekDay,
					yearDay : yearDay
				};

				return dayStuff;
			};

			function newWeekData(weekData)
			{
				return {
					id : weekData.id,
					name : /*"S" +*/ weekData.week,
					days : 1
				};
			};

			function newMonthData(dayStuff)
			{
				return {
					id : dayStuff.year + "_" + dayStuff.monthCode,
					index : dayStuff.month,
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
				var startTimestamp;
				var endTimestamp;
				var weekData;
				var monthData;
				var weekDay;
				var monthDay;
				var dayStuff;
				var yearIndex = -1;
				var root = null;
				var root0 = null;
				var root1 = null;
				var root2 = null;
				var taskIndex = -1;

				$scope.days = [];
				$scope.weeks = {};
				$scope.months = {};
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

				$scope.weekDay=
				[
					"Do",
					"Lu",
					"Ma",
					"Mi",
					"Ju",
					"Vi",
					"Sa"
				];

				$scope.monthName=
				[
					"Ene",
					"Feb",
					"Mar",
					"Abr",
					"May",
					"Jun",
					"Jul",
					"Ago",
					"Oct",
					"Nov",
					"Dic"
				];

				var tree=
				[
					{
						name : "Project",
						start : "2019-03-02",
						end : "2019-07-17",
						progress : 76,
						movable : false
					},
					{
						name : "Batch",
						start : "2019-04-15",
						end : "2019-07-15",
						progress : 15,
						parts:
						[
							{
								name : "Sub Batch",
								start : "2019-04-15",
								end : "2019-06-25",
								progress : 23,
								parts:
								[
									{
										name : "Concept",
										start : "2019-04-16",
										end : "2019-06-20",
										progress : 80,
										parts:
										[
											{
												name : "Estimated Concept 0",
												start : "2019-04-20",
												end : "2019-07-10",
												progress : 15,
												selectable : true
											},
											{
												name : "Estimated Concept 1",
												start : "2019-06-05",
												end : "2019-06-10",
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

				start = new Date($scope.tasks[0].start + "T20:00:00.000Z");
				yearStart = new Date(start);
				yearStart.setDate(1);
				yearStart.setMonth(0);
				yearDay = Math.ceil(Math.abs(start.getTime() - yearStart.getTime()) / 86400000) + 1;
				day = new Date(start);
				end = new Date($scope.tasks[0].end + "T20:00:00.000Z");
				startTimestamp = $scope.formatDate(start);
				endTimestamp = $scope.formatDate(end);

				weekDay = day.getDay();
				dayStuff = getDayStuff(day, weekDay, yearDay);
				$scope.days.push(dayStuff);

				weekData = yearWeek(day);
				$scope.weeks[weekData.id] = newWeekData(weekData);

				monthData = newMonthData(dayStuff);
				$scope.months[monthData.id] = monthData;

				$scope.years.push(dayStuff.year);
				yearIndex++;
				$scope.yearDays[yearIndex] = 1;

				while($scope.formatDate(day) != endTimestamp)
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
					$scope.tasks[$scope.selectedTask].currentDragStartDate= new Date($scope.tasks[$scope.selectedTask].dragStartDate);
					$scope.tasks[$scope.selectedTask].currentDragEndDate = new Date($scope.tasks[$scope.selectedTask].dragEndDate);

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
						$scope.tasks[$scope.selectedTask].currentDragStartDate= new Date($scope.tasks[$scope.selectedTask].dragStartDate);
						$scope.tasks[$scope.selectedTask].currentDragEndDate = new Date($scope.tasks[$scope.selectedTask].dragEndDate);

						$scope.selectedTask = null;
						$scope.selectedDay = null;
					}
				}
				else
				{
					if($scope.selectedTask)
					{
						$scope.dayDiff = Math.ceil(($scope.selectedDay.date.getTime() - day.date.getTime()) / 86400000);

						var dayDiff = $scope.dayDiff;

						$scope.tasks[$scope.selectedTask].dragStartDate.setDate($scope.tasks[$scope.selectedTask].currentDragStartDate.getDate() - $scope.dayDiff);
						$scope.tasks[$scope.selectedTask].dragEndDate.setDate($scope.tasks[$scope.selectedTask].currentDragEndDate.getDate() - $scope.dayDiff);

						$scope.tasks[$scope.selectedTask].dragStart = $scope.formatDate($scope.tasks[$scope.selectedTask].dragStartDate);
						$scope.tasks[$scope.selectedTask].dragEnd = $scope.formatDate($scope.tasks[$scope.selectedTask].dragEndDate);
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