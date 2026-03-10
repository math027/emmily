document.addEventListener('DOMContentLoaded', () => {
  const chatSection   = document.getElementById('como');
  const contentWrapper = document.querySelector('.como-content');
  const chat          = document.getElementById('chat-content');
  const optionsDiv    = document.getElementById('options');
  const errorDiv      = document.getElementById('error');

  let chatStarted = false;

  const steps = [
    {
      myMessage: "Acho que vc deveria visitar minha igreja",
      correctOption: "Obrigada ❤️",
      options: ["Quem é você?", "Obrigada ❤️", "Sai daqui."]
    },
    {
      myMessage: "Então ta convidada.",
      correctOption: "Só estou esperando o convite...",
      options: ["Só estou esperando o convite...", "Não, obrigada", "Kkkk vish"]
    },
    {
      myMessage: "Só estou esperando o convite kkkk",
      correctOption: "Mas se eu for na sua, vc vai ter que ir na minha",
      options: ["Quero ir mais não, obg", "Vou ver e te falo", "Mas se eu for na sua, vc vai ter que ir na minha"]
    }
  ];

  let currentStep = 0;

  function scrollToBottom() {
    chat.scrollTop = chat.scrollHeight;
  }

  function showOptions(step) {
    errorDiv.textContent = '';
    optionsDiv.innerHTML = '';
    setTimeout(() => {
      step.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.className = 'option-btn';
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(8px)';
        btn.style.transition = `opacity 0.35s ease ${index * 0.1}s, transform 0.35s ease ${index * 0.1}s, background 0.25s, border-color 0.25s, transform 0.25s`;
        setTimeout(() => {
          btn.style.opacity = '1';
          btn.style.transform = 'translateY(0)';
        }, 50);
        btn.onclick = () => handleChoice(option, step);
        optionsDiv.appendChild(btn);
      });
    }, 500);
  }

  function handleChoice(choice, step) {
    if (choice === step.correctOption) {
      const herMsg = document.createElement('div');
      herMsg.className = 'message from-her';
      herMsg.textContent = choice;
      chat.appendChild(herMsg);
      scrollToBottom();

      optionsDiv.innerHTML = '';
      errorDiv.textContent = '';
      setTimeout(() => showTyping(step.myMessage), 2000);
    } else {
      errorDiv.textContent = "Hmm... tente lembrar o que você disse! ❤️";
      document.querySelectorAll('.option-btn').forEach(btn => {
        btn.style.animation = 'shake 0.4s';
        setTimeout(() => btn.style.animation = '', 400);
      });
    }
  }

  function showTyping(nextMsg) {
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chat.appendChild(typing);
    scrollToBottom();

    setTimeout(() => {
      typing.remove();
      const msg = document.createElement('div');
      msg.className = 'message from-me';
      msg.textContent = nextMsg;
      chat.appendChild(msg);
      scrollToBottom();

      currentStep++;
      if (steps[currentStep]) {
        showOptions(steps[currentStep]);
      } else {
        optionsDiv.innerHTML = '';
        errorDiv.innerHTML = `<span style="color:var(--rose-gold-light); font-family:'Great Vibes',cursive; font-size:1.3rem;">E assim começou nossa história... ❤️</span>`;
      }
    }, 1600);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contentWrapper.classList.add('visible');
        if (!chatStarted) {
          showOptions(steps[currentStep]);
          chatStarted = true;
        }
      }
    });
  }, { threshold: 0.2 });

  observer.observe(chatSection);
});
