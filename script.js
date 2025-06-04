// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Modal elementlerini seç
    const disclaimerModal = document.getElementById('disclaimerModal');
    const consentCheckbox = document.getElementById('consentCheckbox');
    const closeButton = document.getElementById('closeButton');

    // Modal'ı göster/gizle fonksiyonu
    function toggleModal(show) {
        if (show) {
            disclaimerModal.classList.add('active');
        } else {
            disclaimerModal.classList.remove('active');
        }
    }

    // Checkbox değişikliğini dinle
    consentCheckbox.addEventListener('change', function() {
        closeButton.disabled = !this.checked;
        closeButton.classList.toggle('enabled', this.checked);
    });

    // Kapatma butonuna tıklandığında
    closeButton.addEventListener('click', function() {
        if (consentCheckbox.checked) {
            disclaimerModal.style.display = 'none';
            disclaimerModal.classList.remove('active');
        }
    });

    // Her işlem için ayrı form işlemleri
    function setupCourtForm(ilId, ilceId, mahkemeId) {
        const ilSelect = document.getElementById(ilId);
        const ilceSelect = document.getElementById(ilceId);
        const mahkemeInput = document.getElementById(mahkemeId);

        if (!ilSelect || !ilceSelect || !mahkemeInput) return;

        ilSelect.addEventListener('change', function() {
            ilceSelect.innerHTML = '<option value="">İlçe seçiniz</option>';
            
            const ilceler = {
                'istanbul': ['Kadıköy', 'Beşiktaş', 'Üsküdar', 'Şişli'],
                'ankara': ['Çankaya', 'Keçiören', 'Mamak', 'Yenimahalle'],
                'izmir': ['Konak', 'Karşıyaka', 'Bornova', 'Buca']
            };

            const secilenIl = this.value;
            if (secilenIl && ilceler[secilenIl]) {
                ilceler[secilenIl].forEach(ilce => {
                    const option = document.createElement('option');
                    option.value = ilce.toLowerCase();
                    option.textContent = ilce;
                    ilceSelect.appendChild(option);
                });
            }
        });

        ilceSelect.addEventListener('change', function() {
            const il = ilSelect.value;
            const ilce = this.value;
            
            if (il && ilce) {
                mahkemeInput.value = `${il.toUpperCase()} ${ilce.toUpperCase()} ASLİYE HUKUK MAHKEMESİ`;
            } else {
                mahkemeInput.value = '';
            }
        });
    }

    // Her işlem için form kurulumu
    setupCourtForm('ilAdSoyad', 'ilceAdSoyad', 'mahkemeAdSoyad');
    setupCourtForm('ilEvlenme', 'ilceEvlenme', 'mahkemeEvlenme');
    setupCourtForm('ilErgin', 'ilceErgin', 'mahkemeErgin');
});

// Dilekçe hazırlama sayfasına yönlendirme
function showDilekceHazirla(type) {
    const dilekceTypeTitle = document.getElementById('dilekceTypeTitle');
    const mahkemeAdi = document.getElementById('mahkemeAdi');
    const dilekceMetni = document.getElementById('dilekceMetni');
    
    // Dilekçe türüne göre başlık ve şablon güncelleme
    switch(type) {
        case 'ad-soyad':
            dilekceTypeTitle.textContent = 'Ad Soyad Değişikliği Dilekçesi';
            dilekceMetni.value = getAdSoyadDilekceSablonu();
            break;
        case 'evlenme-izni':
            dilekceTypeTitle.textContent = 'Evlenme İzni Dilekçesi';
            dilekceMetni.value = getEvlenmeIzniDilekceSablonu();
            break;
        case 'ergin-kilma':
            dilekceTypeTitle.textContent = 'Ergin Kılınma Dilekçesi';
            dilekceMetni.value = getErginKilmaDilekceSablonu();
            break;
    }

    // Seçili mahkeme bilgisini al
    const mahkemeInput = document.getElementById(`mahkeme${type.charAt(0).toUpperCase() + type.slice(1)}`);
    if (mahkemeInput) {
        mahkemeAdi.value = mahkemeInput.value;
    }

    showPage('dilekce-sablonu');
}

// Dilekçe önizleme
window.previewDilekce = function() {
    const previewContent = document.getElementById('previewContent');
    const dilekceMetni = document.getElementById('dilekceMetni');
    const previewModal = document.getElementById('previewModal');

    if (!previewContent || !dilekceMetni || !previewModal) {
        console.error('Preview elements not found');
        return;
    }

    previewContent.textContent = dilekceMetni.value;
    previewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closePreview = function() {
    const previewModal = document.getElementById('previewModal');
    if (previewModal) {
        previewModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ESC tuşu ile kapatma
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        window.closePreview();
    }
});

// Dışarı tıklayınca kapatma
document.addEventListener('DOMContentLoaded', function() {
    const previewModal = document.getElementById('previewModal');
    if (previewModal) {
        previewModal.addEventListener('click', function(event) {
            if (event.target === this) {
                window.closePreview();
            }
        });
    }
});

// PDF indirme
function downloadPDF() {
    const element = document.getElementById('previewContent');
    const opt = {
        margin: 1,
        filename: 'dilekce.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}

// Sayfa değiştirme fonksiyonları
function showPage(pageId) {
    // Tüm sayfaları gizle
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Seçilen sayfayı göster
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
}

function openProcessPage(processId) {
    showPage(processId);
    const disclaimerModal = document.getElementById('disclaimerModal');
    disclaimerModal.style.display = 'flex';
    toggleModal(true); // İşlem sayfası açıldığında modal'ı göster
}

// Mobil menü toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
} 