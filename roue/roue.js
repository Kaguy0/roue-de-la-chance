let sectionCount = 0;
    let totalTours = 0;
    const sectionTexts = [];
    const predefinedColors = ['#22092C','#EC8044','#872341', '#BE3144','#F05941'];

    function addSection() {
      sectionCount++;
      let originalText = document.getElementById('sectionText').value || "Section " + sectionCount;
      let truncatedText = originalText.length > 13 ? originalText.substring(0, 12) + '...' : originalText;

      sectionTexts.push({
        original: originalText,
        truncated: truncatedText
      });
      updateWheel();
      updateEditText();
      document.getElementById('sectionText').value = '';
    }

    function updateDegrees(randomFinalRotation) {
      const degreesContainer = document.getElementById('degreesContainer');
      degreesContainer.innerHTML = '';
    
      const targetAngle = (90 - randomFinalRotation + 360) % 360;
    
      for (let i = 0; i < sectionCount; i++) {
        const startAngle = (360 / sectionCount) * i;
        const endAngle = (360 / sectionCount) * (i + 1);
    
        if (startAngle <= targetAngle && endAngle >= targetAngle) {
          const degreeElement = document.createElement('div');
          degreeElement.className = 'degree';
          degreeElement.textContent = sectionTexts[i].original;
    
          degreesContainer.appendChild(degreeElement);
          break;
        }
      }
    }
    
    function updateWheel() {
      const wheel = document.getElementById('wheel');
      wheel.innerHTML = "";
      let conicGradient = 'conic-gradient(';

      for (let i = 0; i < sectionCount; i++) {
        const startAngle = (360 / sectionCount) * i; 
        const endAngle = (360 / sectionCount) * (i + 1);
        const colorIndex = i === 0 ? 0 : (i % (predefinedColors.length - 1)) + 1;

        const sectionElement = document.createElement("div");
        sectionElement.className = 'section';
        sectionElement.innerText = sectionTexts[i].truncated;

        wheel.appendChild(sectionElement);

        const angle = -90 + (360 / sectionCount) * (i + 0.5);
        sectionElement.style.transform = " translate(-50%, -50%) rotate(" + angle + "deg)";

        conicGradient += `${predefinedColors[colorIndex]} ${startAngle}deg ${endAngle}deg`;

        if (i < sectionCount - 1) {
          conicGradient += ', ';
        }
      }

      conicGradient += ')';
      wheel.style.background = conicGradient;
    }

    let isWheelSpinning = false;

    function rotateWheel() {
      if (isWheelSpinning) {
        return;
      }
    
      isWheelSpinning = true;
    
      const wheel = document.getElementById('wheel');
      totalTours += 10;
    
      const randomFinalRotation = Math.floor(Math.random() * 360);
    
      const totalRotation = totalTours * 360 + randomFinalRotation;
    
      wheel.style.transition = "transform 6s ease-out";
      wheel.style.transform = "rotate(" + totalRotation + "deg)";

      wheel.addEventListener('transitionend', function () {
        isWheelSpinning = false;
        updateDegrees(randomFinalRotation);
      });
    }

    function truncateText() {
      let textarea = document.getElementById('sectionText');
      textarea.value = textarea.value.slice(0, 30);
    }

    function checkEnterKey(event) {
      if (event.key === 'Enter') {
        addSection();
        event.preventDefault();
      }
    }

    function updateEditText() {
      const editTextContainer = document.getElementById('sectionsContainer');
      editTextContainer.innerHTML = '';

      sectionTexts.forEach((section, index) => {
        const colorIndex = index === 0 ? 0 : (index % (predefinedColors.length - 1)) + 1;

        const textBox = document.createElement("div");
        textBox.className = 'text-box';
        textBox.style.backgroundColor = predefinedColors[colorIndex];

        const lineElement = document.createElement("span");
        lineElement.textContent = section.original;

        const deleteButton = document.createElement("button");
          deleteButton.className = 'delete-button';
          deleteButton.onclick = () => removeSection(index);

          const croixImage = document.createElement("img");
          croixImage.src = "../image/croix.png";
          croixImage.className = 'croix';
          deleteButton.appendChild(croixImage);


        textBox.appendChild(lineElement);
        textBox.appendChild(deleteButton);
        editTextContainer.appendChild(textBox);
      });
    }

    function removeSection(index) {
      sectionTexts.splice(index, 1);
      sectionCount--;
      updateWheel();
      updateEditText();
    }

    updateWheel();

    document.addEventListener('DOMContentLoaded', function () {
    const savedSections = localStorage.getItem('savedSections');
    if (savedSections) {
      sectionTexts.push(...JSON.parse(savedSections));
      sectionCount = sectionTexts.length;
      updateWheel();
      updateEditText();
    }
  });

  function addSection() {
    sectionCount++;
    let originalText = document.getElementById('sectionText').value || "Section " + sectionCount;
    let truncatedText = originalText.length > 13 ? originalText.substring(0, 12) + '...' : originalText;

    sectionTexts.push({
      original: originalText,
      truncated: truncatedText
    });

    localStorage.setItem('savedSections', JSON.stringify(sectionTexts));

    updateWheel();
    updateEditText();
    document.getElementById('sectionText').value = '';
  }

    function removeSection(index) {
      sectionTexts.splice(index, 1);
      sectionCount--;
      updateWheel();
      updateEditText();

      localStorage.setItem('savedSections', JSON.stringify(sectionTexts));
    }

    