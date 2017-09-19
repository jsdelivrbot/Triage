triage
  .controller('registrarSintomasCtrl', ['$location', '$scope', '$rootScope', 'alertService', '$uibModal', '$timeout', 'patientService', 'dateService',
    function ($location, $scope, $rootScope, alertService, $uibModal, $timeout, patientService, dateService) {

      //public var
      var vm = this;
      vm.symptoms = [];
      vm.requerimientos = [];
      vm.listSymptoms = [{
        'nombre' : 'Tos',
        'nivel' : 'v'
      },{
        'nombre' : 'Tossss',
        'nivel' : 'r'
      },{
        'nombre' : 'Diarrea',
        'nivel' : 'n'
      },{
        'nombre' : 'Tosasd',
        'nivel' : 'v'
      },{
        'nombre' : 'Tosasd',
        'nivel' : 'v'
      },{
        'nombre' : 'Tosdsa',
        'nivel' : 'v'
      },{
        'nombre' : 'Tosdsdsds',
        'nivel' : 'v'
      }
      ]
      vm.patientInfo = {};
      vm.parent = $scope.$parent.vm;
      vm.view = 'triage';


      //public functions
      vm.nextInModalOfRegisterSymptom = nextInModalOfRegisterSymptom;
      vm.closeModalofRegisterSymptom = closeModalofRegisterSymptom;
      vm.addOrDeleteItemInAssignment = addOrDeleteItemInAssignment;
      vm.verifyChecked = verifyChecked;
      vm.addSymptom = addSymptom;
      vm.removeItem = removeItem;

      //private functions
      function activate() {

        patientService.getPatient(vm.parent.patientKey).then(function (response) {
          vm.patientInfo = response;
        })

      }

      activate();

      function nextInModalOfRegisterSymptom(view) {
        switch (view) {

          case 'informacionBasica':
            vm.view = 'sintomas';
            break;

          case 'sintomas':
            vm.view = 'vistaPrevia';
            break;

          case 'vistaPrevia':
            patientService.addPatientToTheQueue(vm.patientInfo, vm.symptoms, vm.requerimientos);
            vm.parent.growl.success('Paciente agregado a la cola!', vm.parent.config);
            vm.parent.patientKey = '';
            vm.parent.modalRegisterSymptom.dismiss();
            break;

        }
      }

      function closeModalofRegisterSymptom() {

        vm.parent.patientKey = '';
        vm.parent.modalRegisterSymptom.dismiss();
      }

      function addOrDeleteItemInAssignment(requisito) {
        //noinspection JSDuplicatedDeclaration
        var symptomIndex = _.findIndex(vm.requerimientos, {'nombre': requisito});

        if (symptomIndex == -1) {
          vm.requerimientos.push({
            nombre: requisito
          })
        } else {
          vm.requerimientos.splice(symptomIndex, 1);

        }
      }

      function verifyChecked(requisito) {
        var checked;

        checked = _.findIndex(vm.requerimientos, {'nombre': requisito});

        return checked;
      }


      function addSymptom(symptom) {

        vm.symptoms.push(symptom)

      }

      function removeItem(array, index) {
        array.splice(index, 1);
      }


    }
  ]);